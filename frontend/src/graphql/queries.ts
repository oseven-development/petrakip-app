/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncProfileSettings = /* GraphQL */ `
  query SyncProfileSettings(
    $filter: ModelProfileSettingsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProfileSettings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        age
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`
export const syncReflexions = /* GraphQL */ `
  query SyncReflexions(
    $filter: ModelReflexionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReflexions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        _version
        _deleted
        _lastChangedAt
        updatedAt
        owner
      }
      nextToken
      startedAt
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
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        state
        deleted
        sharedUsers
        _version
        _deleted
        _lastChangedAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`
export const syncMoments = /* GraphQL */ `
  query SyncMoments(
    $filter: ModelMomentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMoments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        createdAt
        title
        contentType
        content
        tags
        deleted
        sharedUsers
        _version
        _deleted
        _lastChangedAt
        updatedAt
        owner
      }
      nextToken
      startedAt
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
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`
export const syncReflexionMoments = /* GraphQL */ `
  query SyncReflexionMoments(
    $filter: ModelReflexionMomentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReflexionMoments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        reflexionID
        momentID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`
