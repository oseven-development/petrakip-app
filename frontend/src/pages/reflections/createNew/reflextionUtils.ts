import { ReflectionState } from '../../../API'
import { ReflectionQueryParamKeys } from './reflectionQueryParamKeys'
import {
  CreateReflectionInputWithMomentIDs,
  State,
} from './reflectionsCreateNewView'

function URItoObject<T>(
  params: URLSearchParams,
  key: ReflectionQueryParamKeys,
  func: (array: string[]) => T,
): T[] {
  const momentObj = params
    .get(key)
    ?.split(',')
    .map(el => el.split('#'))
    .map(func)
  return momentObj || []
}

export function reflectionURItoState(params: URLSearchParams) {
  const momentObj = URItoObject(
    params,
    ReflectionQueryParamKeys.moment,
    ([id, title, createdAt]) => ({
      id,
      title,
      createdAt,
    }),
  )

  const sharedUsersObjArray = URItoObject(
    params,
    ReflectionQueryParamKeys.SharedUsers,
    ([id, email]) => ({
      id,
      email,
    }),
  )

  const state: State = {
    id: params.get(ReflectionQueryParamKeys.id) || null,
    createdAt: params.get(ReflectionQueryParamKeys.createdAt) || null,
    title: params.get(ReflectionQueryParamKeys.title) || '',
    content: params.get(ReflectionQueryParamKeys.report) || '',
    topic: params.get(ReflectionQueryParamKeys.topic) || '',
    subTopic: params.get(ReflectionQueryParamKeys.subTopic) || '',
    momentIDs: momentObj?.map(({ id }) => id) || [],
    momentObj: momentObj,
    state:
      (params.get(
        ReflectionQueryParamKeys.reflexionState,
      ) as ReflectionState) || ReflectionState.started,
    sharedUsersDetail: sharedUsersObjArray,
  }
  return state
}

export function createReflectionUpdateObject(
  reactState: State,
): CreateReflectionInputWithMomentIDs {
  const id = reactState.id

  const state: CreateReflectionInputWithMomentIDs = {
    id,
    createdAt: reactState.createdAt || new Date().toISOString(),
    title: reactState.title || '',
    content: reactState.content || '',
    topic: reactState.topic || '',
    subTopic: reactState.subTopic || '',
    momentIDs: reactState.momentIDs,
  }
  if (!id) {
    delete state.id
  }

  if (reactState.state === ReflectionState.started) {
    state.state = ReflectionState.awaitingFollowUpQuestions
  }

  return state
}
