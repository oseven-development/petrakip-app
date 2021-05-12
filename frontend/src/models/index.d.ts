import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from '@aws-amplify/datastore'

export enum ContentType {
  IMAGE = 'image',
  VIDEO = 'video',
  TEXT = 'text',
  AUDIO = 'audio',
}

export enum ReflexionState {
  STARTED = 'started',
  AWAITING_FOLLOW_UP_QUESTIONS = 'awaitingFollowUpQuestions',
  COMPLETED = 'completed',
}

export declare class S3Object {
  readonly bucket: string
  readonly key: string
  readonly region: string
  constructor(init: ModelInit<S3Object>)
}

export declare class Comment {
  readonly createdAt: string
  readonly content: string
  constructor(init: ModelInit<Comment>)
}

export declare class OrientationQuestions {
  readonly question: string
  constructor(init: ModelInit<OrientationQuestions>)
}

export declare class ProfileSettings {
  readonly id: string
  readonly profileImage?: S3Object
  readonly age?: number
  constructor(init: ModelInit<ProfileSettings>)
  static copyOf(
    source: ProfileSettings,
    mutator: (
      draft: MutableModel<ProfileSettings>,
    ) => MutableModel<ProfileSettings> | void,
  ): ProfileSettings
}

export declare class Reflexion {
  readonly id: string
  readonly createdAt?: string
  readonly title?: string
  readonly contentType?: ContentType | keyof typeof ContentType
  readonly content?: string
  readonly asset?: S3Object
  readonly topic?: string
  readonly subTopic?: string
  readonly niveau?: string
  readonly indicators?: (string | null)[]
  readonly state?: ReflexionState | keyof typeof ReflexionState
  readonly deleted?: boolean
  readonly sharedUsers?: (string | null)[]
  readonly comments?: (Comment | null)[]
  readonly orientationQuestions?: (OrientationQuestions | null)[]
  readonly moments?: (ReflexionMoment | null)[]
  constructor(init: ModelInit<Reflexion>)
  static copyOf(
    source: Reflexion,
    mutator: (draft: MutableModel<Reflexion>) => MutableModel<Reflexion> | void,
  ): Reflexion
}

export declare class ReflexionMoment {
  readonly id: string
  readonly reflexion: Reflexion
  readonly moment: Moment
  constructor(init: ModelInit<ReflexionMoment>)
  static copyOf(
    source: ReflexionMoment,
    mutator: (
      draft: MutableModel<ReflexionMoment>,
    ) => MutableModel<ReflexionMoment> | void,
  ): ReflexionMoment
}

export declare class Moment {
  readonly id: string
  readonly createdAt?: string
  readonly title: string
  readonly contentType?: ContentType | keyof typeof ContentType
  readonly content?: string
  readonly asset?: S3Object
  readonly tags?: (string | null)[]
  readonly deleted?: boolean
  readonly sharedUsers?: (string | null)[]
  readonly comments?: (Comment | null)[]
  readonly reflexion?: (ReflexionMoment | null)[]
  constructor(init: ModelInit<Moment>)
  static copyOf(
    source: Moment,
    mutator: (draft: MutableModel<Moment>) => MutableModel<Moment> | void,
  ): Moment
}
