import { API, graphqlOperation } from 'aws-amplify'
import { Moment, UpdateMomentInput } from '../../API'
import { updateMoment } from '../../graphql/mutations'
import { GraphQLResult } from '@aws-amplify/api-graphql'

export interface SharedUserInformation {
  email: string
}
export type ShareType = 'share' | 'remove'

export const shareMomentAPI = async ({
  moment,
  sharedUserInformation,
  shareType,
}: {
  moment: Moment
  sharedUserInformation: SharedUserInformation
  shareType: ShareType
}) => {
  try {
    // TODO: add lambda call to check if user is already registered
    // @maxhaensel
    if (shareType === 'share') {
      // add lambda call here
    }

    // removes keys from input which cannot be overritten
    delete (moment as Moment).reflection
    // TODO: Fix TypeError
    //@ts-ignore
    delete (moment as Moment).updatedAt
    delete (moment as Moment).owner

    // add user email (hopefully this works if not we need to gather the id here)
    if (shareType === 'share') {
      if (!moment.sharedUsers) {
        moment.sharedUsers = []
      }
      if (moment.sharedUsers.includes(sharedUserInformation.email)) {
        console.error(`User ${sharedUserInformation.email} bereits freigebeben`)
        return
      }
      moment.sharedUsers.push(sharedUserInformation.email)
      // remove user email
    } else if (shareType === 'remove') {
      moment.sharedUsers = moment.sharedUsers?.filter(item => {
        return item !== sharedUserInformation.email
      })
    } else {
      throw new Error(
        `shareType: ${shareType} not supported. Either provide "share" or "remove"`,
      )
    }
    // update moment
    const res: any = (await API.graphql(
      graphqlOperation(updateMoment, { input: moment }),
    )) as GraphQLResult<{ updateMoment: UpdateMomentInput }>
    return res.data?.updateMoment
  } catch (error) {
    console.error(error)
    throw error
  }
}
