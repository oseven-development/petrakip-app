// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ContentType = {
  "IMAGE": "image",
  "VIDEO": "video",
  "TEXT": "text",
  "AUDIO": "audio"
};

const ReflexionState = {
  "STARTED": "started",
  "AWAITING_FOLLOW_UP_QUESTIONS": "awaitingFollowUpQuestions",
  "COMPLETED": "completed"
};

const { ProfileSettings, Reflexion, ReflexionMoment, Moment, S3Object, Comment, OrientationQuestions } = initSchema(schema);

export {
  ProfileSettings,
  Reflexion,
  ReflexionMoment,
  Moment,
  ContentType,
  ReflexionState,
  S3Object,
  Comment,
  OrientationQuestions
};