import { API, graphqlOperation } from 'aws-amplify'
import { Moment, UpdateMomentInput } from '../../API'
import { updateMoment } from '../../graphql/mutations'
import { GraphQLResult } from '@aws-amplify/api-graphql'

export interface SharedUserInformation {
  email: string
}

export const shareMomentAPI = async ({
  moment,
  sharedUserInformation,
}: {
  moment: Moment
  sharedUserInformation: SharedUserInformation
}) => {
  try {
    // checks if asset is s3 object and if has a key
    if (moment.contentType !== 'text' || moment?.asset?.key) {
      // remove object from s3
      // TODO: share image somehow
    }
    // update moment and add user as shared users

    // removes keys from input which cannot be overritten
    delete (moment as Moment).reflexion
    delete (moment as Moment).updatedAt
    delete (moment as Moment).owner

    // add user email (hopefully this works if not we need to gather the id here)
    moment.sharedUsers?.push(sharedUserInformation.email)

    // update moment
    // TODO: add s3 share first
    // const res: any = (await API.graphql(
    //   graphqlOperation(updateMoment, { input: moment }),
    // )) as GraphQLResult<{ updateMoment: UpdateMomentInput }>
    // return res.data?.updateMoment
  } catch (error) {
    console.error(error)
    throw error
  }
}
