import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import {
  GetMomentQueryVariables,
  OrientationQuestions,
  ReflectionState,
  sharedUsersDetail,
} from '../../API'

export interface CustomReflection {
  id: string
  createdAt: string
  title: string
  content: string
  topic: string
  subTopic: string
  state: ReflectionState
  deleted?: boolean
  sharedUsersDetail: Array<sharedUsersDetail>
  sharedUsers: Array<string>
  orientationQuestions: Array<OrientationQuestions>
  moments: {
    items: {
      moment: {
        id: string
        createdAt: string
        title: string
      }
    }
    nextToken: string
  }
  updatedAt: string
  owner: string | null
}

const GetReflecionsQuery = /* GraphQL */ `
  query GetReflection($id: ID!) {
    getReflection(id: $id) {
      id
      createdAt
      title
      content
      topic
      subTopic
      state
      deleted
      sharedUsers
      sharedUsersDetail {
        id
        email
      }
      orientationQuestions {
        question
      }
      moments {
        items {
          moment {
            id
            createdAt
            title
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
  try {
    const input: GetMomentQueryVariables = { id }
    const res = (await API.graphql(
      graphqlOperation(GetReflecionsQuery, input),
    )) as GraphQLResult<{ getReflection: CustomReflection }>
    if (res.errors) throw res.errors
    if (res.data) return res.data.getReflection
  } catch (error) {
    console.error(error)
  }
}
