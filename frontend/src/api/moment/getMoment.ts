import { API, graphqlOperation, Storage } from 'aws-amplify'
import { ContentType, CreateMomentInput } from '../../API'
import { extension } from 'mime-types'
import awsExports from '../../aws-exports'
import { createMoment } from '../../graphql/mutations'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { getMoment, listMoments } from '../../graphql/queries'

// Can't use Moment from API.ts due to __typename
export interface getMomentAPIInput {
  id?: string
  // dateRange?: [Date, Date]
}

export const getMomentAPI = async ({ id }: getMomentAPIInput) => {
  try {
    // const filter: any = {}
    const variables = {
      // filter,
      // limit: GET_MOMENT_PAGINATION_LIMIT,
      // nextToken,
    }
    if (id) {
      const result: any = await API.graphql(graphqlOperation(getMoment, { id }))
      return result.data.getMoment
    } else {
      const result: any = await API.graphql(
        graphqlOperation(listMoments, variables),
      )
      console.log(result.data.listMoments)
      return result.data.listMoments
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
