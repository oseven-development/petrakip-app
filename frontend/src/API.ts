/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProfileSettingsInput = {
  id?: string | null
  profileImage?: S3ObjectInput | null
  age?: number | null
}

export type S3ObjectInput = {
  bucket: string
  key: string
  region: string
  identityId: string
}

export type ModelProfileSettingsConditionInput = {
  age?: ModelIntInput | null
  and?: Array<ModelProfileSettingsConditionInput | null> | null
  or?: Array<ModelProfileSettingsConditionInput | null> | null
  not?: ModelProfileSettingsConditionInput | null
}

export type ModelIntInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
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

export type ProfileSettings = {
  __typename: 'ProfileSettings'
  id?: string
  profileImage?: S3Object
  age?: number | null
  createdAt?: string
  updatedAt?: string
  owner?: string | null
}

export type S3Object = {
  __typename: 'S3Object'
  bucket?: string
  key?: string
  region?: string
  identityId?: string
}

export type UpdateProfileSettingsInput = {
  id: string
  profileImage?: S3ObjectInput | null
  age?: number | null
}

export type DeleteProfileSettingsInput = {
  id?: string | null
}

export type CreateReflexionInput = {
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
  state?: ReflexionState | null
  deleted?: boolean | null
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

export enum ReflexionState {
  started = 'started',
  awaitingFollowUpQuestions = 'awaitingFollowUpQuestions',
  completed = 'completed',
}

export type CommentInput = {
  createdAt: string
  content: string
}

export type OrientationQuestionsInput = {
  question: string
}

export type ModelReflexionConditionInput = {
  createdAt?: ModelStringInput | null
  title?: ModelStringInput | null
  contentType?: ModelContentTypeInput | null
  content?: ModelStringInput | null
  topic?: ModelStringInput | null
  subTopic?: ModelStringInput | null
  niveau?: ModelStringInput | null
  indicators?: ModelStringInput | null
  state?: ModelReflexionStateInput | null
  deleted?: ModelBooleanInput | null
  and?: Array<ModelReflexionConditionInput | null> | null
  or?: Array<ModelReflexionConditionInput | null> | null
  not?: ModelReflexionConditionInput | null
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

export type ModelSizeInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type ModelContentTypeInput = {
  eq?: ContentType | null
  ne?: ContentType | null
}

export type ModelReflexionStateInput = {
  eq?: ReflexionState | null
  ne?: ReflexionState | null
}

export type ModelBooleanInput = {
  ne?: boolean | null
  eq?: boolean | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
}

export type Reflexion = {
  __typename: 'Reflexion'
  id?: string
  createdAt?: string | null
  title?: string | null
  contentType?: ContentType | null
  content?: string | null
  asset?: S3Object
  topic?: string | null
  subTopic?: string | null
  niveau?: string | null
  indicators?: Array<string | null> | null
  state?: ReflexionState | null
  deleted?: boolean | null
  sharedUsers?: Array<string | null> | null
  comments?: Array<Comment | null> | null
  orientationQuestions?: Array<OrientationQuestions | null> | null
  moments?: ModelReflexionMomentConnection
  updatedAt?: string
  owner?: string | null
}

export type Comment = {
  __typename: 'Comment'
  createdAt?: string
  content?: string
}

export type OrientationQuestions = {
  __typename: 'OrientationQuestions'
  question?: string
}

export type ModelReflexionMomentConnection = {
  __typename: 'ModelReflexionMomentConnection'
  items?: Array<ReflexionMoment | null> | null
  nextToken?: string | null
}

export type ReflexionMoment = {
  __typename: 'ReflexionMoment'
  id?: string
  reflexionID?: string
  momentID?: string
  reflexion?: Reflexion
  moment?: Moment
  createdAt?: string
  updatedAt?: string
  owner?: string | null
}

export type Moment = {
  __typename: 'Moment'
  id?: string
  createdAt?: string | null
  title?: string
  contentType?: ContentType | null
  content?: string | null
  asset?: S3Object
  tags?: Array<string | null> | null
  deleted?: boolean | null
  sharedUsers?: Array<string | null> | null
  comments?: Array<Comment | null> | null
  reflexion?: ModelReflexionMomentConnection
  updatedAt?: string
  owner?: string | null
}

export type UpdateReflexionInput = {
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
  state?: ReflexionState | null
  deleted?: boolean | null
  sharedUsers?: Array<string | null> | null
  comments?: Array<CommentInput | null> | null
  orientationQuestions?: Array<OrientationQuestionsInput | null> | null
}

export type DeleteReflexionInput = {
  id?: string | null
}

export type CreateMomentInput = {
  id?: string | null
  createdAt?: string | null
  title: string
  contentType?: ContentType | null
  content?: string | null
  asset?: S3ObjectInput | null
  tags?: Array<string | null> | null
  deleted?: boolean | null
  sharedUsers?: Array<string | null> | null
  comments?: Array<CommentInput | null> | null
}

export type ModelMomentConditionInput = {
  createdAt?: ModelStringInput | null
  title?: ModelStringInput | null
  contentType?: ModelContentTypeInput | null
  content?: ModelStringInput | null
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
  asset?: S3ObjectInput | null
  tags?: Array<string | null> | null
  deleted?: boolean | null
  sharedUsers?: Array<string | null> | null
  comments?: Array<CommentInput | null> | null
}

export type DeleteMomentInput = {
  id?: string | null
}

export type CreateReflexionMomentInput = {
  id?: string | null
  reflexionID: string
  momentID: string
}

export type ModelReflexionMomentConditionInput = {
  reflexionID?: ModelIDInput | null
  momentID?: ModelIDInput | null
  and?: Array<ModelReflexionMomentConditionInput | null> | null
  or?: Array<ModelReflexionMomentConditionInput | null> | null
  not?: ModelReflexionMomentConditionInput | null
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

export type UpdateReflexionMomentInput = {
  id: string
  reflexionID?: string | null
  momentID?: string | null
}

export type DeleteReflexionMomentInput = {
  id?: string | null
}

export type ModelProfileSettingsFilterInput = {
  id?: ModelIDInput | null
  age?: ModelIntInput | null
  and?: Array<ModelProfileSettingsFilterInput | null> | null
  or?: Array<ModelProfileSettingsFilterInput | null> | null
  not?: ModelProfileSettingsFilterInput | null
}

export type ModelProfileSettingsConnection = {
  __typename: 'ModelProfileSettingsConnection'
  items?: Array<ProfileSettings | null> | null
  nextToken?: string | null
}

export type ModelReflexionFilterInput = {
  id?: ModelIDInput | null
  createdAt?: ModelStringInput | null
  title?: ModelStringInput | null
  contentType?: ModelContentTypeInput | null
  content?: ModelStringInput | null
  topic?: ModelStringInput | null
  subTopic?: ModelStringInput | null
  niveau?: ModelStringInput | null
  indicators?: ModelStringInput | null
  state?: ModelReflexionStateInput | null
  deleted?: ModelBooleanInput | null
  sharedUsers?: ModelStringInput | null
  and?: Array<ModelReflexionFilterInput | null> | null
  or?: Array<ModelReflexionFilterInput | null> | null
  not?: ModelReflexionFilterInput | null
}

export type ModelReflexionConnection = {
  __typename: 'ModelReflexionConnection'
  items?: Array<Reflexion | null> | null
  nextToken?: string | null
}

export type ModelMomentFilterInput = {
  id?: ModelIDInput | null
  createdAt?: ModelStringInput | null
  title?: ModelStringInput | null
  contentType?: ModelContentTypeInput | null
  content?: ModelStringInput | null
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
  input?: CreateProfileSettingsInput
  condition?: ModelProfileSettingsConditionInput | null
}

export type CreateProfileSettingsMutation = {
  createProfileSettings?: {
    __typename: 'ProfileSettings'
    id: string
    profileImage?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId: string
    } | null
    age?: number | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type UpdateProfileSettingsMutationVariables = {
  input?: UpdateProfileSettingsInput
  condition?: ModelProfileSettingsConditionInput | null
}

export type UpdateProfileSettingsMutation = {
  updateProfileSettings?: {
    __typename: 'ProfileSettings'
    id: string
    profileImage?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId: string
    } | null
    age?: number | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type DeleteProfileSettingsMutationVariables = {
  input?: DeleteProfileSettingsInput
  condition?: ModelProfileSettingsConditionInput | null
}

export type DeleteProfileSettingsMutation = {
  deleteProfileSettings?: {
    __typename: 'ProfileSettings'
    id: string
    profileImage?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId: string
    } | null
    age?: number | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type CreateReflexionMutationVariables = {
  input?: CreateReflexionInput
  condition?: ModelReflexionConditionInput | null
}

export type CreateReflexionMutation = {
  createReflexion?: {
    __typename: 'Reflexion'
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
      identityId: string
    } | null
    topic?: string | null
    subTopic?: string | null
    niveau?: string | null
    indicators?: Array<string | null> | null
    state?: ReflexionState | null
    deleted?: boolean | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    orientationQuestions?: Array<{
      __typename: 'OrientationQuestions'
      question: string
    } | null> | null
    moments?: {
      __typename: 'ModelReflexionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type UpdateReflexionMutationVariables = {
  input?: UpdateReflexionInput
  condition?: ModelReflexionConditionInput | null
}

export type UpdateReflexionMutation = {
  updateReflexion?: {
    __typename: 'Reflexion'
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
      identityId: string
    } | null
    topic?: string | null
    subTopic?: string | null
    niveau?: string | null
    indicators?: Array<string | null> | null
    state?: ReflexionState | null
    deleted?: boolean | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    orientationQuestions?: Array<{
      __typename: 'OrientationQuestions'
      question: string
    } | null> | null
    moments?: {
      __typename: 'ModelReflexionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type DeleteReflexionMutationVariables = {
  input?: DeleteReflexionInput
  condition?: ModelReflexionConditionInput | null
}

export type DeleteReflexionMutation = {
  deleteReflexion?: {
    __typename: 'Reflexion'
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
      identityId: string
    } | null
    topic?: string | null
    subTopic?: string | null
    niveau?: string | null
    indicators?: Array<string | null> | null
    state?: ReflexionState | null
    deleted?: boolean | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    orientationQuestions?: Array<{
      __typename: 'OrientationQuestions'
      question: string
    } | null> | null
    moments?: {
      __typename: 'ModelReflexionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type CreateMomentMutationVariables = {
  input?: CreateMomentInput
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
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId: string
    } | null
    tags?: Array<string | null> | null
    deleted?: boolean | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    reflexion?: {
      __typename: 'ModelReflexionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type UpdateMomentMutationVariables = {
  input?: UpdateMomentInput
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
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId: string
    } | null
    tags?: Array<string | null> | null
    deleted?: boolean | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    reflexion?: {
      __typename: 'ModelReflexionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type DeleteMomentMutationVariables = {
  input?: DeleteMomentInput
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
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId: string
    } | null
    tags?: Array<string | null> | null
    deleted?: boolean | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    reflexion?: {
      __typename: 'ModelReflexionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type CreateReflexionMomentMutationVariables = {
  input?: CreateReflexionMomentInput
  condition?: ModelReflexionMomentConditionInput | null
}

export type CreateReflexionMomentMutation = {
  createReflexionMoment?: {
    __typename: 'ReflexionMoment'
    id: string
    reflexionID: string
    momentID: string
    reflexion: {
      __typename: 'Reflexion'
      id: string
      createdAt?: string | null
      title?: string | null
      contentType?: ContentType | null
      content?: string | null
      topic?: string | null
      subTopic?: string | null
      niveau?: string | null
      indicators?: Array<string | null> | null
      state?: ReflexionState | null
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

export type UpdateReflexionMomentMutationVariables = {
  input?: UpdateReflexionMomentInput
  condition?: ModelReflexionMomentConditionInput | null
}

export type UpdateReflexionMomentMutation = {
  updateReflexionMoment?: {
    __typename: 'ReflexionMoment'
    id: string
    reflexionID: string
    momentID: string
    reflexion: {
      __typename: 'Reflexion'
      id: string
      createdAt?: string | null
      title?: string | null
      contentType?: ContentType | null
      content?: string | null
      topic?: string | null
      subTopic?: string | null
      niveau?: string | null
      indicators?: Array<string | null> | null
      state?: ReflexionState | null
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

export type DeleteReflexionMomentMutationVariables = {
  input?: DeleteReflexionMomentInput
  condition?: ModelReflexionMomentConditionInput | null
}

export type DeleteReflexionMomentMutation = {
  deleteReflexionMoment?: {
    __typename: 'ReflexionMoment'
    id: string
    reflexionID: string
    momentID: string
    reflexion: {
      __typename: 'Reflexion'
      id: string
      createdAt?: string | null
      title?: string | null
      contentType?: ContentType | null
      content?: string | null
      topic?: string | null
      subTopic?: string | null
      niveau?: string | null
      indicators?: Array<string | null> | null
      state?: ReflexionState | null
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
  msg?: string | null
}

export type CheckUserAndShareAssetQuery = {
  checkUserAndShareAsset?: string | null
}

export type CreateSignedUrlForAssetsQueryVariables = {
  bucket?: string | null
  key?: string | null
}

export type CreateSignedUrlForAssetsQuery = {
  createSignedUrlForAssets?: string | null
}

export type GetProfileSettingsQueryVariables = {
  id?: string
}

export type GetProfileSettingsQuery = {
  getProfileSettings?: {
    __typename: 'ProfileSettings'
    id: string
    profileImage?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId: string
    } | null
    age?: number | null
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
      age?: number | null
      createdAt: string
      updatedAt: string
      owner?: string | null
    } | null> | null
    nextToken?: string | null
  } | null
}

export type GetReflexionQueryVariables = {
  id?: string
}

export type GetReflexionQuery = {
  getReflexion?: {
    __typename: 'Reflexion'
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
      identityId: string
    } | null
    topic?: string | null
    subTopic?: string | null
    niveau?: string | null
    indicators?: Array<string | null> | null
    state?: ReflexionState | null
    deleted?: boolean | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    orientationQuestions?: Array<{
      __typename: 'OrientationQuestions'
      question: string
    } | null> | null
    moments?: {
      __typename: 'ModelReflexionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type ListReflexionsQueryVariables = {
  filter?: ModelReflexionFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListReflexionsQuery = {
  listReflexions?: {
    __typename: 'ModelReflexionConnection'
    items?: Array<{
      __typename: 'Reflexion'
      id: string
      createdAt?: string | null
      title?: string | null
      contentType?: ContentType | null
      content?: string | null
      topic?: string | null
      subTopic?: string | null
      niveau?: string | null
      indicators?: Array<string | null> | null
      state?: ReflexionState | null
      deleted?: boolean | null
      sharedUsers?: Array<string | null> | null
      updatedAt: string
      owner?: string | null
    } | null> | null
    nextToken?: string | null
  } | null
}

export type GetMomentQueryVariables = {
  id?: string
}

export type GetMomentQuery = {
  getMoment?: {
    __typename: 'Moment'
    id: string
    createdAt?: string | null
    title: string
    contentType?: ContentType | null
    content?: string | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId: string
    } | null
    tags?: Array<string | null> | null
    deleted?: boolean | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    reflexion?: {
      __typename: 'ModelReflexionMomentConnection'
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
  owner?: string
}

export type OnCreateProfileSettingsSubscription = {
  onCreateProfileSettings?: {
    __typename: 'ProfileSettings'
    id: string
    profileImage?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId: string
    } | null
    age?: number | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnUpdateProfileSettingsSubscriptionVariables = {
  owner?: string
}

export type OnUpdateProfileSettingsSubscription = {
  onUpdateProfileSettings?: {
    __typename: 'ProfileSettings'
    id: string
    profileImage?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId: string
    } | null
    age?: number | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnDeleteProfileSettingsSubscriptionVariables = {
  owner?: string
}

export type OnDeleteProfileSettingsSubscription = {
  onDeleteProfileSettings?: {
    __typename: 'ProfileSettings'
    id: string
    profileImage?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId: string
    } | null
    age?: number | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnCreateReflexionSubscriptionVariables = {
  owner?: string
  sharedUsers?: string
}

export type OnCreateReflexionSubscription = {
  onCreateReflexion?: {
    __typename: 'Reflexion'
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
      identityId: string
    } | null
    topic?: string | null
    subTopic?: string | null
    niveau?: string | null
    indicators?: Array<string | null> | null
    state?: ReflexionState | null
    deleted?: boolean | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    orientationQuestions?: Array<{
      __typename: 'OrientationQuestions'
      question: string
    } | null> | null
    moments?: {
      __typename: 'ModelReflexionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnUpdateReflexionSubscriptionVariables = {
  owner?: string
  sharedUsers?: string
}

export type OnUpdateReflexionSubscription = {
  onUpdateReflexion?: {
    __typename: 'Reflexion'
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
      identityId: string
    } | null
    topic?: string | null
    subTopic?: string | null
    niveau?: string | null
    indicators?: Array<string | null> | null
    state?: ReflexionState | null
    deleted?: boolean | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    orientationQuestions?: Array<{
      __typename: 'OrientationQuestions'
      question: string
    } | null> | null
    moments?: {
      __typename: 'ModelReflexionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnDeleteReflexionSubscriptionVariables = {
  owner?: string
  sharedUsers?: string
}

export type OnDeleteReflexionSubscription = {
  onDeleteReflexion?: {
    __typename: 'Reflexion'
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
      identityId: string
    } | null
    topic?: string | null
    subTopic?: string | null
    niveau?: string | null
    indicators?: Array<string | null> | null
    state?: ReflexionState | null
    deleted?: boolean | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    orientationQuestions?: Array<{
      __typename: 'OrientationQuestions'
      question: string
    } | null> | null
    moments?: {
      __typename: 'ModelReflexionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnCreateMomentSubscriptionVariables = {
  owner?: string
  sharedUsers?: string
}

export type OnCreateMomentSubscription = {
  onCreateMoment?: {
    __typename: 'Moment'
    id: string
    createdAt?: string | null
    title: string
    contentType?: ContentType | null
    content?: string | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId: string
    } | null
    tags?: Array<string | null> | null
    deleted?: boolean | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    reflexion?: {
      __typename: 'ModelReflexionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnUpdateMomentSubscriptionVariables = {
  owner?: string
  sharedUsers?: string
}

export type OnUpdateMomentSubscription = {
  onUpdateMoment?: {
    __typename: 'Moment'
    id: string
    createdAt?: string | null
    title: string
    contentType?: ContentType | null
    content?: string | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId: string
    } | null
    tags?: Array<string | null> | null
    deleted?: boolean | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    reflexion?: {
      __typename: 'ModelReflexionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnDeleteMomentSubscriptionVariables = {
  owner?: string
  sharedUsers?: string
}

export type OnDeleteMomentSubscription = {
  onDeleteMoment?: {
    __typename: 'Moment'
    id: string
    createdAt?: string | null
    title: string
    contentType?: ContentType | null
    content?: string | null
    asset?: {
      __typename: 'S3Object'
      bucket: string
      key: string
      region: string
      identityId: string
    } | null
    tags?: Array<string | null> | null
    deleted?: boolean | null
    sharedUsers?: Array<string | null> | null
    comments?: Array<{
      __typename: 'Comment'
      createdAt: string
      content: string
    } | null> | null
    reflexion?: {
      __typename: 'ModelReflexionMomentConnection'
      nextToken?: string | null
    } | null
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnCreateReflexionMomentSubscriptionVariables = {
  owner?: string
}

export type OnCreateReflexionMomentSubscription = {
  onCreateReflexionMoment?: {
    __typename: 'ReflexionMoment'
    id: string
    reflexionID: string
    momentID: string
    reflexion: {
      __typename: 'Reflexion'
      id: string
      createdAt?: string | null
      title?: string | null
      contentType?: ContentType | null
      content?: string | null
      topic?: string | null
      subTopic?: string | null
      niveau?: string | null
      indicators?: Array<string | null> | null
      state?: ReflexionState | null
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

export type OnUpdateReflexionMomentSubscriptionVariables = {
  owner?: string
}

export type OnUpdateReflexionMomentSubscription = {
  onUpdateReflexionMoment?: {
    __typename: 'ReflexionMoment'
    id: string
    reflexionID: string
    momentID: string
    reflexion: {
      __typename: 'Reflexion'
      id: string
      createdAt?: string | null
      title?: string | null
      contentType?: ContentType | null
      content?: string | null
      topic?: string | null
      subTopic?: string | null
      niveau?: string | null
      indicators?: Array<string | null> | null
      state?: ReflexionState | null
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

export type OnDeleteReflexionMomentSubscriptionVariables = {
  owner?: string
}

export type OnDeleteReflexionMomentSubscription = {
  onDeleteReflexionMoment?: {
    __typename: 'ReflexionMoment'
    id: string
    reflexionID: string
    momentID: string
    reflexion: {
      __typename: 'Reflexion'
      id: string
      createdAt?: string | null
      title?: string | null
      contentType?: ContentType | null
      content?: string | null
      topic?: string | null
      subTopic?: string | null
      niveau?: string | null
      indicators?: Array<string | null> | null
      state?: ReflexionState | null
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
