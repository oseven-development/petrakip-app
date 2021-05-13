/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProfileSettings = /* GraphQL */ `
  mutation CreateProfileSettings(
    $input: CreateProfileSettingsInput!
    $condition: ModelProfileSettingsConditionInput
  ) {
    createProfileSettings(input: $input, condition: $condition) {
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
export const updateProfileSettings = /* GraphQL */ `
  mutation UpdateProfileSettings(
    $input: UpdateProfileSettingsInput!
    $condition: ModelProfileSettingsConditionInput
  ) {
    updateProfileSettings(input: $input, condition: $condition) {
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
export const deleteProfileSettings = /* GraphQL */ `
  mutation DeleteProfileSettings(
    $input: DeleteProfileSettingsInput!
    $condition: ModelProfileSettingsConditionInput
  ) {
    deleteProfileSettings(input: $input, condition: $condition) {
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
export const createReflexion = /* GraphQL */ `
  mutation CreateReflexion(
    $input: CreateReflexionInput!
    $condition: ModelReflexionConditionInput
  ) {
    createReflexion(input: $input, condition: $condition) {
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
      }
      updatedAt
      owner
    }
  }
`
export const updateReflexion = /* GraphQL */ `
  mutation UpdateReflexion(
    $input: UpdateReflexionInput!
    $condition: ModelReflexionConditionInput
  ) {
    updateReflexion(input: $input, condition: $condition) {
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
      }
      updatedAt
      owner
    }
  }
`
export const deleteReflexion = /* GraphQL */ `
  mutation DeleteReflexion(
    $input: DeleteReflexionInput!
    $condition: ModelReflexionConditionInput
  ) {
    deleteReflexion(input: $input, condition: $condition) {
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
      }
      updatedAt
      owner
    }
  }
`
export const createMoment = /* GraphQL */ `
  mutation CreateMoment(
    $input: CreateMomentInput!
    $condition: ModelMomentConditionInput
  ) {
    createMoment(input: $input, condition: $condition) {
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
export const updateMoment = /* GraphQL */ `
  mutation UpdateMoment(
    $input: UpdateMomentInput!
    $condition: ModelMomentConditionInput
  ) {
    updateMoment(input: $input, condition: $condition) {
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
export const deleteMoment = /* GraphQL */ `
  mutation DeleteMoment(
    $input: DeleteMomentInput!
    $condition: ModelMomentConditionInput
  ) {
    deleteMoment(input: $input, condition: $condition) {
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
export const createReflexionMoment = /* GraphQL */ `
  mutation CreateReflexionMoment(
    $input: CreateReflexionMomentInput!
    $condition: ModelReflexionMomentConditionInput
  ) {
    createReflexionMoment(input: $input, condition: $condition) {
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
export const updateReflexionMoment = /* GraphQL */ `
  mutation UpdateReflexionMoment(
    $input: UpdateReflexionMomentInput!
    $condition: ModelReflexionMomentConditionInput
  ) {
    updateReflexionMoment(input: $input, condition: $condition) {
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
export const deleteReflexionMoment = /* GraphQL */ `
  mutation DeleteReflexionMoment(
    $input: DeleteReflexionMomentInput!
    $condition: ModelReflexionMomentConditionInput
  ) {
    deleteReflexionMoment(input: $input, condition: $condition) {
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
