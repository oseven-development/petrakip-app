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
        identityId
      }
      age
      createdAt
      updatedAt
      owner
    }
  }
`;
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
        identityId
      }
      age
      createdAt
      updatedAt
      owner
    }
  }
`;
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
        identityId
      }
      age
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createReflection = /* GraphQL */ `
  mutation CreateReflection(
    $input: CreateReflectionInput!
    $condition: ModelReflectionConditionInput
  ) {
    createReflection(input: $input, condition: $condition) {
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
export const updateReflection = /* GraphQL */ `
  mutation UpdateReflection(
    $input: UpdateReflectionInput!
    $condition: ModelReflectionConditionInput
  ) {
    updateReflection(input: $input, condition: $condition) {
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
export const deleteReflection = /* GraphQL */ `
  mutation DeleteReflection(
    $input: DeleteReflectionInput!
    $condition: ModelReflectionConditionInput
  ) {
    deleteReflection(input: $input, condition: $condition) {
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
export const createReflectionMoment = /* GraphQL */ `
  mutation CreateReflectionMoment(
    $input: CreateReflectionMomentInput!
    $condition: ModelReflectionMomentConditionInput
  ) {
    createReflectionMoment(input: $input, condition: $condition) {
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
export const updateReflectionMoment = /* GraphQL */ `
  mutation UpdateReflectionMoment(
    $input: UpdateReflectionMomentInput!
    $condition: ModelReflectionMomentConditionInput
  ) {
    updateReflectionMoment(input: $input, condition: $condition) {
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
export const deleteReflectionMoment = /* GraphQL */ `
  mutation DeleteReflectionMoment(
    $input: DeleteReflectionMomentInput!
    $condition: ModelReflectionMomentConditionInput
  ) {
    deleteReflectionMoment(input: $input, condition: $condition) {
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
