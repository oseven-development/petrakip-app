/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProfileSettingsInput = {
  id?: string | null
  profilePicture?: S3ObjectInput | null
  latestExportKey?: string | null
}

export type S3ObjectInput = {
  bucket: string
  key: string
  region: string
  identityId?: string | null
}

export type ModelProfileSettingsConditionInput = {
  latestExportKey?: ModelStringInput | null
  and?: Array<ModelProfileSettingsConditionInput | null> | null
  or?: Array<ModelProfileSettingsConditionInput | null> | null
  not?: ModelProfileSettingsConditionInput | null
}

export type ModelStringInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type ProfileSettings = {
  __typename: 'ProfileSettings'
  id: string
  profilePicture?: S3Object | null
  latestExportKey?: string | null
  createdAt: string
  updatedAt: string
  owner?: string | null
}

export type S3Object = {
  __typename: 'S3Object'
  bucket: string
  key: string
  region: string
  identityId?: string | null
}

export type UpdateProfileSettingsInput = {
  id: string
  profilePicture?: S3ObjectInput | null
  latestExportKey?: string | null
}

export type DeleteProfileSettingsInput = {
  id: string
}

export type CreateReflectionInput = {
  id?: string | null
  createdAt?: string | null
  title?: string | null
  contentType?: ContentType | null
  content?: string | null
  asset?: S3ObjectInput | null
  topic?: string | null
  subTopic?: string | null
  niveau?: string | null
  indicators?: Array<string | null> | null
  state?: ReflectionState | null
  deleted?: boolean | null
  sharedUsersDetail?: Array<SharedUsersDetailInput | null> | null
  sharedUsers?: Array<string | null> | null
  comments?: Array<CommentInput | null> | null
  orientationQuestions?: Array<OrientationQuestionsInput | null> | null
}

export enum ContentType {
  image = 'image',
  video = 'video',
  text = 'text',
  audio = 'audio',
}

export enum ReflectionState {
  started = 'started',
  awaitingFollowUpQuestions = 'awaitingFollowUpQuestions',
  completed = 'completed',
}

export type SharedUsersDetailInput = {
  id: string
  email: string
}

export type CommentInput = {
  createdAt: string
  content: string
}

export type OrientationQuestionsInput = {
  question: string
  answer: string
}

export type ModelReflectionConditionInput = {
  createdAt?: ModelStringInput | null
  title?: ModelStringInput | null
  contentType?: ModelContentTypeInput | null
  content?: ModelStringInput | null
  topic?: ModelStringInput | null
  subTopic?: ModelStringInput | null
  niveau?: ModelStringInput | null
  indicators?: ModelStringInput | null
  state?: ModelReflectionStateInput | null
  deleted?: ModelBooleanInput | null
  and?: Array<ModelReflectionConditionInput | null> | null
  or?: Array<ModelReflectionConditionInput | null> | null
  not?: ModelReflectionConditionInput | null
}

export type ModelContentTypeInput = {
  eq?: ContentType | null
  ne?: ContentType | null
}

export type ModelReflectionStateInput = {
  eq?: ReflectionState | null
  ne?: ReflectionState | null
}

export type ModelBooleanInput = {
  ne?: boolean | null
  eq?: boolean | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
}

export type Reflection = {
  __typename: 'Reflection'
  id: string
  createdAt?: string | null
  title?: string | null
  contentType?: ContentType | null
  content?: string | null
  asset?: S3Object | null
  topic?: string | null
  subTopic?: string | null
  niveau?: string | null
  indicators?: Array<string | null> | null
  state?: ReflectionState | null
  deleted?: boolean | null
  sharedUsersDetail?: Array<sharedUsersDetail | null> | null
  sharedUsers?: Array<string | null> | null
  comments?: Array<Comment | null> | null
  orientationQuestions?: Array<OrientationQuestions | null> | null
  moments?: ModelReflectionMomentConnection | null
  updatedAt: string
  owner?: string | null
}

export type sharedUsersDetail = {
  __typename: 'sharedUsersDetail'
  id: string
  email: string
}

export type Comment = {
  __typename: 'Comment'
  createdAt: string
  content: string
}

export type OrientationQuestions = {
  __typename: 'OrientationQuestions'
  question: string
  answer: string
}

export type ModelReflectionMomentConnection = {
  __typename: 'ModelReflectionMomentConnection'
  items?: Array<ReflectionMoment | null> | null
  nextToken?: string | null
}

export type ReflectionMoment = {
  __typename: 'ReflectionMoment'
  id: string
  reflectionID: string
  momentID: string
  reflection: Reflection
  moment: Moment
  createdAt: string
  updatedAt: string
  owner?: string | null
}

export type Moment = {
  __typename: 'Moment'
  id: string
  createdAt?: string | null
  title: string
  contentType?: ContentType | null
  content?: string | null
  isFavorite?: boolean | null
  asset?: S3Object | null
  tags?: Array<string | null> | null
  deleted?: boolean | null
  sharedUsersDetail?: Array<sharedUsersDetail | null> | null
  sharedUsers?: Array<string | null> | null
  comments?: Array<Comment | null> | null
  reflection?: ModelReflectionMomentConnection | null
  updatedAt: string
  owner?: string | null
}

export type UpdateReflectionInput = {
  id: string
  createdAt?: string | null
  title?: string | null
  contentType?: ContentType | null
  content?: string | null
  asset?: S3ObjectInput | null
  topic?: string | null
  subTopic?: string | null
  niveau?: string | null
  indicators?: Array<string | null> | null
  state?: ReflectionState | null
  deleted?: boolean | null
  sharedUsersDetail?: Array<SharedUsersDetailInput | null> | null
  sharedUsers?: Array<string | null> | null
  comments?: Array<CommentInput | null> | null
  orientationQuestions?: Array<OrientationQuestionsInput | null> | null
}

export type DeleteReflectionInput = {
  id: string
}

export type CreateMomentInput = {
  id?: string | null
  createdAt?: string | null
  title: string
  contentType?: ContentType | null
  content?: string | null
  isFavorite?: boolean | null
  asset?: S3ObjectInput | null
  tags?: Array<string | null> | null
  deleted?: boolean | null
  sharedUsersDetail?: Array<SharedUsersDetailInput | null> | null
  sharedUsers?: Array<string | null> | null
  comments?: Array<CommentInput | null> | null
}

export type ModelMomentConditionInput = {
  createdAt?: ModelStringInput | null
  title?: ModelStringInput | null
  contentType?: ModelContentTypeInput | null
  content?: ModelStringInput | null
  isFavorite?: ModelBooleanInput | null
  tags?: ModelStringInput | null
  deleted?: ModelBooleanInput | null
  and?: Array<ModelMomentConditionInput | null> | null
  or?: Array<ModelMomentConditionInput | null> | null
  not?: ModelMomentConditionInput | null
}

export type UpdateMomentInput = {
  id: string
  createdAt?: string | null
  title?: string | null
  contentType?: ContentType | null
  content?: string | null
  isFavorite?: boolean | null
  asset?: S3ObjectInput | null
  tags?: Array<string | null> | null
  deleted?: boolean | null
  sharedUsersDetail?: Array<SharedUsersDetailInput | null> | null
  sharedUsers?: Array<string | null> | null
  comments?: Array<CommentInput | null> | null
}

export type DeleteMomentInput = {
  id: string
}

export type CreateReflectionMomentInput = {
  id?: string | null
  reflectionID: string
  momentID: string
}

export type ModelReflectionMomentConditionInput = {
  reflectionID?: ModelIDInput | null
  momentID?: ModelIDInput | null
  and?: Array<ModelReflectionMomentConditionInput | null> | null
  or?: Array<ModelReflectionMomentConditionInput | null> | null
  not?: ModelReflectionMomentConditionInput | null
}

export type ModelIDInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export type UpdateReflectionMomentInput = {
  id: string
  reflectionID?: string | null
  momentID?: string | null
}

export type DeleteReflectionMomentInput = {
  id: string
}

export type CheckShare = {
  __typename: 'CheckShare'
  uuid: string
  email: string
  alreadyExist: boolean
}

export type ModelProfileSettingsFilterInput = {
  id?: ModelIDInput | null
  latestExportKey?: ModelStringInput | null
  and?: Array<ModelProfileSettingsFilterInput | null> | null
  or?: Array<ModelProfileSettingsFilterInput | null> | null
  not?: ModelProfileSettingsFilterInput | null
}

export type ModelProfileSettingsConnection = {
  __typename: 'ModelProfileSettingsConnection'
  items?: Array<ProfileSettings | null> | null
  nextToken?: string | null
}

export type ModelReflectionFilterInput = {
  id?: ModelIDInput | null
  createdAt?: ModelStringInput | null
  title?: ModelStringInput | null
  contentType?: ModelContentTypeInput | null
  content?: ModelStringInput | null
  topic?: ModelStringInput | null
  subTopic?: ModelStringInput | null
  niveau?: ModelStringInput | null
  indicators?: ModelStringInput | null
  state?: ModelReflectionStateInput | null
  deleted?: ModelBooleanInput | null
  sharedUsers?: ModelStringInput | null
  and?: Array<ModelReflectionFilterInput | null> | null
  or?: Array<ModelReflectionFilterInput | null> | null
  not?: ModelReflectionFilterInput | null
}

export type ModelReflectionConnection = {
  __typename: 'ModelReflectionConnection'
  items?: Array<Reflection | null> | null
  nextToken?: string | null
}

export type ModelMomentFilterInput = {
  id?: ModelIDInput | null
  createdAt?: ModelStringInput | null
  title?: ModelStringInput | null
  contentType?: ModelContentTypeInput | null
  content?: ModelStringInput | null
  isFavorite?: ModelBooleanInput | null
  tags?: ModelStringInput | null
  deleted?: ModelBooleanInput | null
  sharedUsers?: ModelStringInput | null
  and?: Array<ModelMomentFilterInput | null> | null
  or?: Array<ModelMomentFilterInput | null> | null
  not?: ModelMomentFilterInput | null
}

export type ModelMomentConnection = {
  __typename: 'ModelMomentConnection'
  items?: Array<Moment | null> | null
  nextToken?: string | null
}

export type CreateProfileSettingsMutationVariables = {
  input: CreateProfileSettingsInput
  condition?: ModelProfileSettingsConditionInput | null
}

export type CreateProfileSettingsMutation = {
  createProfileSettings?: {
    __typename: 'ProfileSettings'
    id: string
    profilePicture?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    latestExportKey?: string | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type UpdateProfileSettingsMutationVariables = {
  input: UpdateProfileSettingsInput
  condition?: ModelProfileSettingsConditionInput | null
}

export type UpdateProfileSettingsMutation = {
  updateProfileSettings?: {
    __typename: 'ProfileSettings'
    id: string
    profilePicture?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    latestExportKey?: string | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type DeleteProfileSettingsMutationVariables = {
  input: DeleteProfileSettingsInput
  condition?: ModelProfileSettingsConditionInput | null
}

export type DeleteProfileSettingsMutation = {
  deleteProfileSettings?: {
    __typename: 'ProfileSettings'
    id: string
    profilePicture?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    latestExportKey?: string | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type CreateReflectionMutationVariables = {
  input: CreateReflectionInput
  condition?: ModelReflectionConditionInput | null
}

export type CreateReflectionMutation = {
  createReflection?: {
    __typename: 'Reflection'
    id: string
    createdAt?: string | null
    title?: string | null
    contentType?: ContentType | null
    content?: string | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    topic?: string | null
    subTopic?: string | null
    niveau?: string | null
    indicators?: Array<string | null> | null
    state?: ReflectionState | null
    deleted?: boolean | null
    sharedUsersDetail?: Array<{
      __typename: 'sharedUsersDetail'
      id: string
      email: string
    } | null> | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    orientationQuestions?: Array<{
      __typename: 'OrientationQuestions'
      question: string
      answer: string
    } | null> | null
    moments?: {
      __typename: 'ModelReflectionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type UpdateReflectionMutationVariables = {
  input: UpdateReflectionInput
  condition?: ModelReflectionConditionInput | null
}

export type UpdateReflectionMutation = {
  updateReflection?: {
    __typename: 'Reflection'
    id: string
    createdAt?: string | null
    title?: string | null
    contentType?: ContentType | null
    content?: string | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    topic?: string | null
    subTopic?: string | null
    niveau?: string | null
    indicators?: Array<string | null> | null
    state?: ReflectionState | null
    deleted?: boolean | null
    sharedUsersDetail?: Array<{
      __typename: 'sharedUsersDetail'
      id: string
      email: string
    } | null> | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    orientationQuestions?: Array<{
      __typename: 'OrientationQuestions'
      question: string
      answer: string
    } | null> | null
    moments?: {
      __typename: 'ModelReflectionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type DeleteReflectionMutationVariables = {
  input: DeleteReflectionInput
  condition?: ModelReflectionConditionInput | null
}

export type DeleteReflectionMutation = {
  deleteReflection?: {
    __typename: 'Reflection'
    id: string
    createdAt?: string | null
    title?: string | null
    contentType?: ContentType | null
    content?: string | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    topic?: string | null
    subTopic?: string | null
    niveau?: string | null
    indicators?: Array<string | null> | null
    state?: ReflectionState | null
    deleted?: boolean | null
    sharedUsersDetail?: Array<{
      __typename: 'sharedUsersDetail'
      id: string
      email: string
    } | null> | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    orientationQuestions?: Array<{
      __typename: 'OrientationQuestions'
      question: string
      answer: string
    } | null> | null
    moments?: {
      __typename: 'ModelReflectionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type CreateMomentMutationVariables = {
  input: CreateMomentInput
  condition?: ModelMomentConditionInput | null
}

export type CreateMomentMutation = {
  createMoment?: {
    __typename: 'Moment'
    id: string
    createdAt?: string | null
    title: string
    contentType?: ContentType | null
    content?: string | null
    isFavorite?: boolean | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    tags?: Array<string | null> | null
    deleted?: boolean | null
    sharedUsersDetail?: Array<{
      __typename: 'sharedUsersDetail'
      id: string
      email: string
    } | null> | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    reflection?: {
      __typename: 'ModelReflectionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type UpdateMomentMutationVariables = {
  input: UpdateMomentInput
  condition?: ModelMomentConditionInput | null
}

export type UpdateMomentMutation = {
  updateMoment?: {
    __typename: 'Moment'
    id: string
    createdAt?: string | null
    title: string
    contentType?: ContentType | null
    content?: string | null
    isFavorite?: boolean | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    tags?: Array<string | null> | null
    deleted?: boolean | null
    sharedUsersDetail?: Array<{
      __typename: 'sharedUsersDetail'
      id: string
      email: string
    } | null> | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    reflection?: {
      __typename: 'ModelReflectionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type DeleteMomentMutationVariables = {
  input: DeleteMomentInput
  condition?: ModelMomentConditionInput | null
}

export type DeleteMomentMutation = {
  deleteMoment?: {
    __typename: 'Moment'
    id: string
    createdAt?: string | null
    title: string
    contentType?: ContentType | null
    content?: string | null
    isFavorite?: boolean | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    tags?: Array<string | null> | null
    deleted?: boolean | null
    sharedUsersDetail?: Array<{
      __typename: 'sharedUsersDetail'
      id: string
      email: string
    } | null> | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    reflection?: {
      __typename: 'ModelReflectionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type CreateReflectionMomentMutationVariables = {
  input: CreateReflectionMomentInput
  condition?: ModelReflectionMomentConditionInput | null
}

export type CreateReflectionMomentMutation = {
  createReflectionMoment?: {
    __typename: 'ReflectionMoment'
    id: string
    reflectionID: string
    momentID: string
    reflection: {
      __typename: 'Reflection'
      id: string
      createdAt?: string | null
      title?: string | null
      contentType?: ContentType | null
      content?: string | null
      topic?: string | null
      subTopic?: string | null
      niveau?: string | null
      indicators?: Array<string | null> | null
      state?: ReflectionState | null
      deleted?: boolean | null
      sharedUsers?: Array<string | null> | null
      updatedAt: string
      owner?: string | null
    }
    moment: {
      __typename: 'Moment'
      id: string
      createdAt?: string | null
      title: string
      contentType?: ContentType | null
      content?: string | null
      isFavorite?: boolean | null
      tags?: Array<string | null> | null
      deleted?: boolean | null
      sharedUsers?: Array<string | null> | null
      updatedAt: string
      owner?: string | null
    }
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type UpdateReflectionMomentMutationVariables = {
  input: UpdateReflectionMomentInput
  condition?: ModelReflectionMomentConditionInput | null
}

export type UpdateReflectionMomentMutation = {
  updateReflectionMoment?: {
    __typename: 'ReflectionMoment'
    id: string
    reflectionID: string
    momentID: string
    reflection: {
      __typename: 'Reflection'
      id: string
      createdAt?: string | null
      title?: string | null
      contentType?: ContentType | null
      content?: string | null
      topic?: string | null
      subTopic?: string | null
      niveau?: string | null
      indicators?: Array<string | null> | null
      state?: ReflectionState | null
      deleted?: boolean | null
      sharedUsers?: Array<string | null> | null
      updatedAt: string
      owner?: string | null
    }
    moment: {
      __typename: 'Moment'
      id: string
      createdAt?: string | null
      title: string
      contentType?: ContentType | null
      content?: string | null
      isFavorite?: boolean | null
      tags?: Array<string | null> | null
      deleted?: boolean | null
      sharedUsers?: Array<string | null> | null
      updatedAt: string
      owner?: string | null
    }
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type DeleteReflectionMomentMutationVariables = {
  input: DeleteReflectionMomentInput
  condition?: ModelReflectionMomentConditionInput | null
}

export type DeleteReflectionMomentMutation = {
  deleteReflectionMoment?: {
    __typename: 'ReflectionMoment'
    id: string
    reflectionID: string
    momentID: string
    reflection: {
      __typename: 'Reflection'
      id: string
      createdAt?: string | null
      title?: string | null
      contentType?: ContentType | null
      content?: string | null
      topic?: string | null
      subTopic?: string | null
      niveau?: string | null
      indicators?: Array<string | null> | null
      state?: ReflectionState | null
      deleted?: boolean | null
      sharedUsers?: Array<string | null> | null
      updatedAt: string
      owner?: string | null
    }
    moment: {
      __typename: 'Moment'
      id: string
      createdAt?: string | null
      title: string
      contentType?: ContentType | null
      content?: string | null
      isFavorite?: boolean | null
      tags?: Array<string | null> | null
      deleted?: boolean | null
      sharedUsers?: Array<string | null> | null
      updatedAt: string
      owner?: string | null
    }
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type CheckUserAndShareAssetQueryVariables = {
  username?: string | null
}

export type CheckUserAndShareAssetQuery = {
  checkUserAndShareAsset?: {
    __typename: 'CheckShare'
    uuid: string
    email: string
    alreadyExist: boolean
  } | null
}

export type CreateSignedUrlForAssetsQueryVariables = {
  bucket?: string | null
  key?: string | null
}

export type CreateSignedUrlForAssetsQuery = {
  createSignedUrlForAssets?: string | null
}

export type CreateDataExportForUserQueryVariables = {
  userKey?: string | null
}

export type CreateDataExportForUserQuery = {
  createDataExportForUser?: string | null
}

export type GetProfileSettingsQueryVariables = {
  id: string
}

export type GetProfileSettingsQuery = {
  getProfileSettings?: {
    __typename: 'ProfileSettings'
    id: string
    profilePicture?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    latestExportKey?: string | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type ListProfileSettingssQueryVariables = {
  filter?: ModelProfileSettingsFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListProfileSettingssQuery = {
  listProfileSettingss?: {
    __typename: 'ModelProfileSettingsConnection'
    items?: Array<{
      __typename: 'ProfileSettings'
      id: string
      latestExportKey?: string | null
      createdAt: string
      updatedAt: string
      owner?: string | null
    } | null> | null
    nextToken?: string | null
  } | null
}

export type GetReflectionQueryVariables = {
  id: string
}

export type GetReflectionQuery = {
  getReflection?: {
    __typename: 'Reflection'
    id: string
    createdAt?: string | null
    title?: string | null
    contentType?: ContentType | null
    content?: string | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    topic?: string | null
    subTopic?: string | null
    niveau?: string | null
    indicators?: Array<string | null> | null
    state?: ReflectionState | null
    deleted?: boolean | null
    sharedUsersDetail?: Array<{
      __typename: 'sharedUsersDetail'
      id: string
      email: string
    } | null> | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    orientationQuestions?: Array<{
      __typename: 'OrientationQuestions'
      question: string
      answer: string
    } | null> | null
    moments?: {
      __typename: 'ModelReflectionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type ListReflectionsQueryVariables = {
  filter?: ModelReflectionFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListReflectionsQuery = {
  listReflections?: {
    __typename: 'ModelReflectionConnection'
    items?: Array<{
      __typename: 'Reflection'
      id: string
      createdAt?: string | null
      title?: string | null
      contentType?: ContentType | null
      content?: string | null
      topic?: string | null
      subTopic?: string | null
      niveau?: string | null
      indicators?: Array<string | null> | null
      state?: ReflectionState | null
      deleted?: boolean | null
      sharedUsers?: Array<string | null> | null
      updatedAt: string
      owner?: string | null
    } | null> | null
    nextToken?: string | null
  } | null
}

export type GetMomentQueryVariables = {
  id: string
}

export type GetMomentQuery = {
  getMoment?: {
    __typename: 'Moment'
    id: string
    createdAt?: string | null
    title: string
    contentType?: ContentType | null
    content?: string | null
    isFavorite?: boolean | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    tags?: Array<string | null> | null
    deleted?: boolean | null
    sharedUsersDetail?: Array<{
      __typename: 'sharedUsersDetail'
      id: string
      email: string
    } | null> | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    reflection?: {
      __typename: 'ModelReflectionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type ListMomentsQueryVariables = {
  filter?: ModelMomentFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListMomentsQuery = {
  listMoments?: {
    __typename: 'ModelMomentConnection'
    items?: Array<{
      __typename: 'Moment'
      id: string
      createdAt?: string | null
      title: string
      contentType?: ContentType | null
      content?: string | null
      isFavorite?: boolean | null
      tags?: Array<string | null> | null
      deleted?: boolean | null
      sharedUsers?: Array<string | null> | null
      updatedAt: string
      owner?: string | null
    } | null> | null
    nextToken?: string | null
  } | null
}

export type OnCreateProfileSettingsSubscriptionVariables = {
  owner: string
}

export type OnCreateProfileSettingsSubscription = {
  onCreateProfileSettings?: {
    __typename: 'ProfileSettings'
    id: string
    profilePicture?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    latestExportKey?: string | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnUpdateProfileSettingsSubscriptionVariables = {
  owner: string
}

export type OnUpdateProfileSettingsSubscription = {
  onUpdateProfileSettings?: {
    __typename: 'ProfileSettings'
    id: string
    profilePicture?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    latestExportKey?: string | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnDeleteProfileSettingsSubscriptionVariables = {
  owner: string
}

export type OnDeleteProfileSettingsSubscription = {
  onDeleteProfileSettings?: {
    __typename: 'ProfileSettings'
    id: string
    profilePicture?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    latestExportKey?: string | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnCreateReflectionSubscriptionVariables = {
  owner: string
  sharedUsers: string
}

export type OnCreateReflectionSubscription = {
  onCreateReflection?: {
    __typename: 'Reflection'
    id: string
    createdAt?: string | null
    title?: string | null
    contentType?: ContentType | null
    content?: string | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    topic?: string | null
    subTopic?: string | null
    niveau?: string | null
    indicators?: Array<string | null> | null
    state?: ReflectionState | null
    deleted?: boolean | null
    sharedUsersDetail?: Array<{
      __typename: 'sharedUsersDetail'
      id: string
      email: string
    } | null> | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    orientationQuestions?: Array<{
      __typename: 'OrientationQuestions'
      question: string
      answer: string
    } | null> | null
    moments?: {
      __typename: 'ModelReflectionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnUpdateReflectionSubscriptionVariables = {
  owner: string
  sharedUsers: string
}

export type OnUpdateReflectionSubscription = {
  onUpdateReflection?: {
    __typename: 'Reflection'
    id: string
    createdAt?: string | null
    title?: string | null
    contentType?: ContentType | null
    content?: string | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    topic?: string | null
    subTopic?: string | null
    niveau?: string | null
    indicators?: Array<string | null> | null
    state?: ReflectionState | null
    deleted?: boolean | null
    sharedUsersDetail?: Array<{
      __typename: 'sharedUsersDetail'
      id: string
      email: string
    } | null> | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    orientationQuestions?: Array<{
      __typename: 'OrientationQuestions'
      question: string
      answer: string
    } | null> | null
    moments?: {
      __typename: 'ModelReflectionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnDeleteReflectionSubscriptionVariables = {
  owner: string
  sharedUsers: string
}

export type OnDeleteReflectionSubscription = {
  onDeleteReflection?: {
    __typename: 'Reflection'
    id: string
    createdAt?: string | null
    title?: string | null
    contentType?: ContentType | null
    content?: string | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    topic?: string | null
    subTopic?: string | null
    niveau?: string | null
    indicators?: Array<string | null> | null
    state?: ReflectionState | null
    deleted?: boolean | null
    sharedUsersDetail?: Array<{
      __typename: 'sharedUsersDetail'
      id: string
      email: string
    } | null> | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    orientationQuestions?: Array<{
      __typename: 'OrientationQuestions'
      question: string
      answer: string
    } | null> | null
    moments?: {
      __typename: 'ModelReflectionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnCreateMomentSubscriptionVariables = {
  owner: string
  sharedUsers: string
}

export type OnCreateMomentSubscription = {
  onCreateMoment?: {
    __typename: 'Moment'
    id: string
    createdAt?: string | null
    title: string
    contentType?: ContentType | null
    content?: string | null
    isFavorite?: boolean | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    tags?: Array<string | null> | null
    deleted?: boolean | null
    sharedUsersDetail?: Array<{
      __typename: 'sharedUsersDetail'
      id: string
      email: string
    } | null> | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    reflection?: {
      __typename: 'ModelReflectionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnUpdateMomentSubscriptionVariables = {
  owner: string
  sharedUsers: string
}

export type OnUpdateMomentSubscription = {
  onUpdateMoment?: {
    __typename: 'Moment'
    id: string
    createdAt?: string | null
    title: string
    contentType?: ContentType | null
    content?: string | null
    isFavorite?: boolean | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    tags?: Array<string | null> | null
    deleted?: boolean | null
    sharedUsersDetail?: Array<{
      __typename: 'sharedUsersDetail'
      id: string
      email: string
    } | null> | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    reflection?: {
      __typename: 'ModelReflectionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnDeleteMomentSubscriptionVariables = {
  owner: string
  sharedUsers: string
}

export type OnDeleteMomentSubscription = {
  onDeleteMoment?: {
    __typename: 'Moment'
    id: string
    createdAt?: string | null
    title: string
    contentType?: ContentType | null
    content?: string | null
    isFavorite?: boolean | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId?: string | null
    } | null
    tags?: Array<string | null> | null
    deleted?: boolean | null
    sharedUsersDetail?: Array<{
      __typename: 'sharedUsersDetail'
      id: string
      email: string
    } | null> | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    reflection?: {
      __typename: 'ModelReflectionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnCreateReflectionMomentSubscriptionVariables = {
  owner: string
}

export type OnCreateReflectionMomentSubscription = {
  onCreateReflectionMoment?: {
    __typename: 'ReflectionMoment'
    id: string
    reflectionID: string
    momentID: string
    reflection: {
      __typename: 'Reflection'
      id: string
      createdAt?: string | null
      title?: string | null
      contentType?: ContentType | null
      content?: string | null
      topic?: string | null
      subTopic?: string | null
      niveau?: string | null
      indicators?: Array<string | null> | null
      state?: ReflectionState | null
      deleted?: boolean | null
      sharedUsers?: Array<string | null> | null
      updatedAt: string
      owner?: string | null
    }
    moment: {
      __typename: 'Moment'
      id: string
      createdAt?: string | null
      title: string
      contentType?: ContentType | null
      content?: string | null
      isFavorite?: boolean | null
      tags?: Array<string | null> | null
      deleted?: boolean | null
      sharedUsers?: Array<string | null> | null
      updatedAt: string
      owner?: string | null
    }
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnUpdateReflectionMomentSubscriptionVariables = {
  owner: string
}

export type OnUpdateReflectionMomentSubscription = {
  onUpdateReflectionMoment?: {
    __typename: 'ReflectionMoment'
    id: string
    reflectionID: string
    momentID: string
    reflection: {
      __typename: 'Reflection'
      id: string
      createdAt?: string | null
      title?: string | null
      contentType?: ContentType | null
      content?: string | null
      topic?: string | null
      subTopic?: string | null
      niveau?: string | null
      indicators?: Array<string | null> | null
      state?: ReflectionState | null
      deleted?: boolean | null
      sharedUsers?: Array<string | null> | null
      updatedAt: string
      owner?: string | null
    }
    moment: {
      __typename: 'Moment'
      id: string
      createdAt?: string | null
      title: string
      contentType?: ContentType | null
      content?: string | null
      isFavorite?: boolean | null
      tags?: Array<string | null> | null
      deleted?: boolean | null
      sharedUsers?: Array<string | null> | null
      updatedAt: string
      owner?: string | null
    }
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnDeleteReflectionMomentSubscriptionVariables = {
  owner: string
}

export type OnDeleteReflectionMomentSubscription = {
  onDeleteReflectionMoment?: {
    __typename: 'ReflectionMoment'
    id: string
    reflectionID: string
    momentID: string
    reflection: {
      __typename: 'Reflection'
      id: string
      createdAt?: string | null
      title?: string | null
      contentType?: ContentType | null
      content?: string | null
      topic?: string | null
      subTopic?: string | null
      niveau?: string | null
      indicators?: Array<string | null> | null
      state?: ReflectionState | null
      deleted?: boolean | null
      sharedUsers?: Array<string | null> | null
      updatedAt: string
      owner?: string | null
    }
    moment: {
      __typename: 'Moment'
      id: string
      createdAt?: string | null
      title: string
      contentType?: ContentType | null
      content?: string | null
      isFavorite?: boolean | null
      tags?: Array<string | null> | null
      deleted?: boolean | null
      sharedUsers?: Array<string | null> | null
      updatedAt: string
      owner?: string | null
    }
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}
