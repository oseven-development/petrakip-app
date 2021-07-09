import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { GetMomentQueryVariables, GetReflectionQuery } from '../../API'

const GetReflecionsQuery = /* GraphQL */ `
  query GetReflecion($id: ID!) {
    getReflecion(id: $id) {
      id
      createdAt
      title
      contentType
      content
      asset {
        bucket
        key
        region
      }
      topic
      subTopic
      niveau
      indicators
      state
      deleted
      sharedUsers
      comments {
        createdAt
        content
      }
      orientationQuestions {
        question
      }
      moments {
        items {
          moment {
            id
          }
        }
        nextToken
      }

      updatedAt
      owner
    }
  }
`

export const getReflectionAPI = async (id: string) => {
  const input: GetMomentQueryVariables = { id }
  const res = (await API.graphql(
    graphqlOperation(GetReflecionsQuery, input),
  )) as GraphQLResult<{ getReflecion: GetReflectionQuery }>
  console.log(res.data)
  return res.data?.getReflecion
}
