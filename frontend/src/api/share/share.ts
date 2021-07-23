import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'

import { getMoment } from '../../graphql/queries'

import { GetReflecionsShareQuery } from './querys'

import { UpdateReflectionInput, UpdateMomentInput } from '../../API'
import { updateMoment, updateReflection } from '../../graphql/mutations'
import { ShareUser } from '../../types/shareUser'

import { AssetType } from '../../types/assetType'

export type ShareType = 'share' | 'remove'

interface ShareItem {
  id: string
  sharedUsersDetail: any
  sharedUsers: any
  moments?: { items: { moment: { id: string } }[]; nextToken: string }
}

/*
 all possible Share-Options with querys and mutations
*/
const shareOperations = {
  Moment: {
    getQuery: getMoment,
    updateMutation: updateMoment,
  },
  Reflection: {
    getQuery: GetReflecionsShareQuery,
    updateMutation: updateReflection,
  },
}

export async function shareAPI<T extends ShareItem>(
  user: ShareUser,
  id: string,
  ShareType: ShareType,
  key: AssetType,
) {
  try {
    /*
      Load the current object to manipulate it
    */
    const res = (await API.graphql(
      graphqlOperation(shareOperations[key].getQuery, { id }),
    )) as GraphQLResult<{ [key: string]: T }>
    if (res.errors) throw res.errors
    if (res.data) {
      const ref = res.data[`get${key}`]

      /*
        this object contains all information to Update the Moment or Reflection
      */
      const update: UpdateReflectionInput | UpdateMomentInput = {
        id: ref.id,
        sharedUsersDetail: ref.sharedUsersDetail,
        sharedUsers: ref.sharedUsers,
      }

      if (ShareType === 'share') {
        /*
         when sharedUsers is empty or null, create a array and add the user
        */
        if (ref.sharedUsers === [] || ref.sharedUsers === null) {
          update.sharedUsers = [user.id]
          update.sharedUsersDetail = [{ id: user.id, email: user.email }]
        }

        if (update.sharedUsers?.includes(user.id)) {
          // do nothing, user is allready in the array
        }

        /*
         when sharedUsers is not empty or null, add the user to the array
        */
        if (
          update.sharedUsers &&
          update.sharedUsersDetail &&
          !update.sharedUsers?.includes(user.id)
        ) {
          update.sharedUsers = [...update.sharedUsers, user.id]
          update.sharedUsersDetail = [
            ...update.sharedUsersDetail,
            { id: user.id, email: user.email },
          ]
        }
      }
      if (ShareType === 'remove') {
        update.sharedUsers = update.sharedUsers?.filter(
          item => item !== user.id,
        )
        update.sharedUsersDetail = update.sharedUsersDetail?.filter(
          item => item?.id !== user.id,
        )
      }

      /*
       Update Moment or Reflection
      */
      try {
        const res = (await API.graphql(
          graphqlOperation(shareOperations[key].updateMutation, {
            input: update,
          }),
        )) as GraphQLResult<{ [key: string]: T }>
        if (res.errors) throw res.errors
      } catch (error) {
        console.error(error)
        throw error
      }

      /*
       if the Share-Type is Reflection, call Recursive ShareAPI to Update related moments as well
      */
      if (key === 'Reflection' && ref.moments) {
        try {
          const updateMomentId = ref.moments.items.map(
            ({ moment: { id } }) => id,
          )
          const updateMomentShare = updateMomentId.map(id =>
            shareAPI(user, id, ShareType, 'Moment'),
          )
          await Promise.all(updateMomentShare)
        } catch (error) {
          console.error(error)
        }
      }
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
