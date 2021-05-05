/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfileSettings = /* GraphQL */ `
  query GetProfileSettings($id: ID!) {
    getProfileSettings(id: $id) {
      id
      profileImage {
        bucket
        key
        region
      }
      age
      createdAt
      updatedAt
      owner
    }
  }
`
export const listProfileSettingss = /* GraphQL */ `
  query ListProfileSettingss(
    $filter: ModelProfileSettingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfileSettingss(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        age
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`
export const getReflexion = /* GraphQL */ `
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
        nextToken
      }
      updatedAt
      owner
    }
  }
`
export const listReflexions = /* GraphQL */ `
  query ListReflexions(
    $filter: ModelReflexionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReflexions(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        deleted
        sharedUsers
        updatedAt
        owner
      }
      nextToken
    }
  }
`
export const getMoment = /* GraphQL */ `
  query GetMoment($id: ID!) {
    getMoment(id: $id) {
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
      tags
      deleted
      sharedUsers
      comments {
        createdAt
        content
      }
      reflexion {
        nextToken
      }
      updatedAt
      owner
    }
  }
`
export const listMoments = /* GraphQL */ `
  query ListMoments(
    $filter: ModelMomentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMoments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        title
        contentType
        content
        tags
        deleted
        sharedUsers
        updatedAt
        owner
      }
      nextToken
    }
  }
`
