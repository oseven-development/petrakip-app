import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { GetMomentQueryVariables, GetReflexionQuery } from '../../API'

const GetReflexionsQuery = /* GraphQL */ `
  query GetReflexion($id: ID!) {
    getReflexion(id: $id) {
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

export const getReflextionAPI = async (id: string) => {
  const input: GetMomentQueryVariables = { id }
  const res = (await API.graphql(
    graphqlOperation(GetReflexionsQuery, input),
  )) as GraphQLResult<{ getReflexion: GetReflexionQuery }>
  console.log(res.data)
  return res.data?.getReflexion
}
