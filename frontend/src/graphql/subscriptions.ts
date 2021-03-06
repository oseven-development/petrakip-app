/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProfileSettings = /* GraphQL */ `
  subscription OnCreateProfileSettings($owner: String!) {
    onCreateProfileSettings(owner: $owner) {
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
export const onUpdateProfileSettings = /* GraphQL */ `
  subscription OnUpdateProfileSettings($owner: String!) {
    onUpdateProfileSettings(owner: $owner) {
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
export const onDeleteProfileSettings = /* GraphQL */ `
  subscription OnDeleteProfileSettings($owner: String!) {
    onDeleteProfileSettings(owner: $owner) {
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
export const onCreateReflection = /* GraphQL */ `
  subscription OnCreateReflection($owner: String!, $sharedUsers: String!) {
    onCreateReflection(owner: $owner, sharedUsers: $sharedUsers) {
      id
      createdAt
      title
      content
      topic
      subTopic
      state
      deleted
      sharedUsersDetail {
        id
        email
      }
      sharedUsers
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
export const onUpdateReflection = /* GraphQL */ `
  subscription OnUpdateReflection($owner: String!, $sharedUsers: String!) {
    onUpdateReflection(owner: $owner, sharedUsers: $sharedUsers) {
      id
      createdAt
      title
      content
      topic
      subTopic
      state
      deleted
      sharedUsersDetail {
        id
        email
      }
      sharedUsers
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
export const onDeleteReflection = /* GraphQL */ `
  subscription OnDeleteReflection($owner: String!, $sharedUsers: String!) {
    onDeleteReflection(owner: $owner, sharedUsers: $sharedUsers) {
      id
      createdAt
      title
      content
      topic
      subTopic
      state
      deleted
      sharedUsersDetail {
        id
        email
      }
      sharedUsers
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
export const onCreateMoment = /* GraphQL */ `
  subscription OnCreateMoment($owner: String!, $sharedUsers: String!) {
    onCreateMoment(owner: $owner, sharedUsers: $sharedUsers) {
      id
      createdAt
      title
      contentType
      content
      isFavorite
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
      reflection {
        nextToken
      }
      updatedAt
      owner
    }
  }
`;
export const onUpdateMoment = /* GraphQL */ `
  subscription OnUpdateMoment($owner: String!, $sharedUsers: String!) {
    onUpdateMoment(owner: $owner, sharedUsers: $sharedUsers) {
      id
      createdAt
      title
      contentType
      content
      isFavorite
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
      reflection {
        nextToken
      }
      updatedAt
      owner
    }
  }
`;
export const onDeleteMoment = /* GraphQL */ `
  subscription OnDeleteMoment($owner: String!, $sharedUsers: String!) {
    onDeleteMoment(owner: $owner, sharedUsers: $sharedUsers) {
      id
      createdAt
      title
      contentType
      content
      isFavorite
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
      reflection {
        nextToken
      }
      updatedAt
      owner
    }
  }
`;
export const onCreateReflectionMoment = /* GraphQL */ `
  subscription OnCreateReflectionMoment($owner: String!) {
    onCreateReflectionMoment(owner: $owner) {
      id
      reflectionID
      momentID
      reflection {
        id
        createdAt
        title
        content
        topic
        subTopic
        state
        deleted
        sharedUsers
        updatedAt
        owner
      }
      moment {
        id
        createdAt
        title
        contentType
        content
        isFavorite
        tags
        deleted
        sharedUsers
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateReflectionMoment = /* GraphQL */ `
  subscription OnUpdateReflectionMoment($owner: String!) {
    onUpdateReflectionMoment(owner: $owner) {
      id
      reflectionID
      momentID
      reflection {
        id
        createdAt
        title
        content
        topic
        subTopic
        state
        deleted
        sharedUsers
        updatedAt
        owner
      }
      moment {
        id
        createdAt
        title
        contentType
        content
        isFavorite
        tags
        deleted
        sharedUsers
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteReflectionMoment = /* GraphQL */ `
  subscription OnDeleteReflectionMoment($owner: String!) {
    onDeleteReflectionMoment(owner: $owner) {
      id
      reflectionID
      momentID
      reflection {
        id
        createdAt
        title
        content
        topic
        subTopic
        state
        deleted
        sharedUsers
        updatedAt
        owner
      }
      moment {
        id
        createdAt
        title
        contentType
        content
        isFavorite
        tags
        deleted
        sharedUsers
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
