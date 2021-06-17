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
`
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
`
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
`
export const onCreateReflexion = /* GraphQL */ `
  subscription OnCreateReflexion($owner: String!, $sharedUsers: String!) {
    onCreateReflexion(owner: $owner, sharedUsers: $sharedUsers) {
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
export const onUpdateReflexion = /* GraphQL */ `
  subscription OnUpdateReflexion($owner: String!, $sharedUsers: String!) {
    onUpdateReflexion(owner: $owner, sharedUsers: $sharedUsers) {
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
export const onDeleteReflexion = /* GraphQL */ `
  subscription OnDeleteReflexion($owner: String!, $sharedUsers: String!) {
    onDeleteReflexion(owner: $owner, sharedUsers: $sharedUsers) {
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
export const onCreateReflexionMoment = /* GraphQL */ `
  subscription OnCreateReflexionMoment($owner: String!) {
    onCreateReflexionMoment(owner: $owner) {
      id
      reflexionID
      momentID
      reflexion {
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
`
export const onUpdateReflexionMoment = /* GraphQL */ `
  subscription OnUpdateReflexionMoment($owner: String!) {
    onUpdateReflexionMoment(owner: $owner) {
      id
      reflexionID
      momentID
      reflexion {
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
`
export const onDeleteReflexionMoment = /* GraphQL */ `
  subscription OnDeleteReflexionMoment($owner: String!) {
    onDeleteReflexionMoment(owner: $owner) {
      id
      reflexionID
      momentID
      reflexion {
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
`
