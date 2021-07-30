/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const checkUserAndShareAsset = /* GraphQL */ `
  query CheckUserAndShareAsset($username: String) {
    checkUserAndShareAsset(username: $username) {
      uuid
      email
      alreadyExist
    }
  }
`;
export const createSignedUrlForAssets = /* GraphQL */ `
  query CreateSignedUrlForAssets($bucket: String, $key: String) {
    createSignedUrlForAssets(bucket: $bucket, key: $key)
  }
`;
export const getProfileSettings = /* GraphQL */ `
  query GetProfileSettings($id: ID!) {
    getProfileSettings(id: $id) {
      id
      profilePicture {
        bucket
        key
        region
        identityId
      }
      latestExportKey
      createdAt
      updatedAt
      owner
    }
  }
`;
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
        latestExportKey
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getReflection = /* GraphQL */ `
  query GetReflection($id: ID!) {
    getReflection(id: $id) {
      id
      createdAt
      title
      contentType
      content
      asset {
        bucket
        key
        region
        identityId
      }
      topic
      subTopic
      niveau
      indicators
      state
      deleted
      sharedUsersDetail {
        id
        email
      }
      sharedUsers
      comments {
        createdAt
        content
      }
      orientationQuestions {
        question
        answer
      }
      moments {
        nextToken
      }
      updatedAt
      owner
    }
  }
`;
export const listReflections = /* GraphQL */ `
  query ListReflections(
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
`;
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
        identityId
      }
      tags
      deleted
      sharedUsersDetail {
        id
        email
      }
      sharedUsers
      comments {
        createdAt
        content
      }
      reflection {
        nextToken
      }
      updatedAt
      owner
    }
  }
`;
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
`;
