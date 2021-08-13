import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { Reflection } from '../../API'

const ListReflectionsQuery = /* GraphQL */ `
  query ListReflecions(
    $filter: ModelReflectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReflections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        title
        contentType
        content
        topic
        subTopic
        niveau
        indicators
        state
        deleted
        sharedUsers
        sharedUsersDetail {
          id
          email
        }
        updatedAt
        owner
      }
      nextToken
    }
  }
`

export const listAllReflectionsAPI = async (): Promise<Reflection[]> => {
  try {
    const res = (await API.graphql(
      graphqlOperation(ListReflectionsQuery),
    )) as GraphQLResult<any>
    if (res.errors) throw res.errors
    if (res.data) return res.data.listReflections.items
    return []
  } catch (error) {
    console.log(error)
    throw error
  }
}

const ListAllReflectionsTopicsQuery = /* GraphQL */ `
  query ListReflecions(
    $filter: ModelReflectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReflections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        subTopic
      }
      nextToken
    }
  }
`

type subTopic = { subTopic: string }[]

export const listAllReflectionsTopicsAPI = async (): Promise<subTopic> => {
  try {
    const res = (await API.graphql(
      graphqlOperation(ListAllReflectionsTopicsQuery),
    )) as GraphQLResult<any>
    if (res.errors) console.error(res.errors)
    if (res.data) return res.data.listReflections.items as subTopic
  } catch (error) {
    console.error(error)
  }
  return []
}
