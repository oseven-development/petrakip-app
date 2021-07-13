import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'

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
        updatedAt
        owner
      }
      nextToken
    }
  }
`

export const listAllReflectionsAPI = async () => {
  try {
    const res = (await API.graphql(
      graphqlOperation(ListReflectionsQuery),
    )) as GraphQLResult<any>
    if (res.errors) console.log(res.errors)
    if (res.data) return res.data.listReflections.items
  } catch (error) {
    console.log(error)
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
