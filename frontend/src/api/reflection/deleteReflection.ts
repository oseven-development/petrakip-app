import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { deleteReflection } from '../../graphql/mutations'
import { DeleteReflectionInput, Reflection } from '../../API'

export const delteReflectionAPI = async (id: string) => {
  try {
    const input: DeleteReflectionInput = { id }
    const res = (await API.graphql(
      graphqlOperation(deleteReflection, { input }),
    )) as GraphQLResult<{ deleteReflection: Reflection }>
    if (res.errors) throw res.errors
    return res.data?.deleteReflection
  } catch (error) {
    console.error(error)
  }
}
