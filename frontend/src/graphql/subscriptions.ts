/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProfileSettings = /* GraphQL */ `
  subscription OnCreateProfileSettings($owner: String!) {
    onCreateProfileSettings(owner: $owner) {
      id
      profileImage {
        bucket
        key
        region
        identityId
      }
      age
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
      profileImage {
        bucket
        key
        region
        identityId
      }
      age
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
      profileImage {
        bucket
        key
        region
        identityId
      }
      age
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
export const onUpdateReflection = /* GraphQL */ `
  subscription OnUpdateReflection($owner: String!, $sharedUsers: String!) {
    onUpdateReflection(owner: $owner, sharedUsers: $sharedUsers) {
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
export const onDeleteReflection = /* GraphQL */ `
  subscription OnDeleteReflection($owner: String!, $sharedUsers: String!) {
    onDeleteReflection(owner: $owner, sharedUsers: $sharedUsers) {
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
export const onCreateMoment = /* GraphQL */ `
  subscription OnCreateMoment($owner: String!, $sharedUsers: String!) {
    onCreateMoment(owner: $owner, sharedUsers: $sharedUsers) {
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
export const onUpdateMoment = /* GraphQL */ `
  subscription OnUpdateMoment($owner: String!, $sharedUsers: String!) {
    onUpdateMoment(owner: $owner, sharedUsers: $sharedUsers) {
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
export const onDeleteMoment = /* GraphQL */ `
  subscription OnDeleteMoment($owner: String!, $sharedUsers: String!) {
    onDeleteMoment(owner: $owner, sharedUsers: $sharedUsers) {
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
      moment {
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
      moment {
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
      moment {
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
      createdAt
      updatedAt
      owner
    }
  }
`;
