import { checkUserAndShareAsset } from '../../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { CheckShare } from '../../API'

export const checkUserAndShareAssetAPI = async (
  mail: string,
): Promise<CheckShare> => {
  try {
    const res = (await API.graphql(
      graphqlOperation(checkUserAndShareAsset, {
        username: mail,
      }),
    )) as GraphQLResult<{
      checkUserAndShareAsset: CheckShare
    }>
    if (res.errors) throw res.errors
    if (res.data) return res.data.checkUserAndShareAsset
  } catch (error) {
    throw error.errors
  }
  throw new Error('somthing faild')
}
