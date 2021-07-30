import { Reflection, ReflectionState } from '../../API'
import { CustomReflection } from '../../api/reflection/getReflection'
import { ReflectionQueryParamKeys } from './createNew/reflectionQueryParamKeys'
import {
  CreateReflectionInputWithMomentIDs,
  State,
} from './createNew/reflectionsCreateNewView'

export function reflectionURItoState(params: URLSearchParams) {
  const momentObj = extractDataFromArray<{
    id: string
    title: string
    createdAt: string
  }>(params, ReflectionQueryParamKeys.moment)

  const sharedUsersObjArray = extractDataFromArray<{
    id: string
    email: string
  }>(params, ReflectionQueryParamKeys.SharedUsers)

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

export function reflectionStatetoURI({
  id,
  title,
  topic,
  subTopic,
  content,
  createdAt,
  state,
  sharedUsersDetail,
  moments,
}: Reflection | CustomReflection): string {
  const arr: string[] = []

  if (id) {
    arr.push(`${ReflectionQueryParamKeys.id}=${id}`)
  }
  if (title) {
    arr.push(`${ReflectionQueryParamKeys.title}=${title}`)
  }
  if (topic) {
    arr.push(`${ReflectionQueryParamKeys.topic}=${topic}`)
  }
  if (subTopic) {
    arr.push(`${ReflectionQueryParamKeys.subTopic}=${subTopic}`)
  }
  if (content) {
    arr.push(`${ReflectionQueryParamKeys.report}=${content}`)
  }
  if (createdAt) {
    arr.push(`${ReflectionQueryParamKeys.createdAt}=${createdAt}`)
  }

  if (state) {
    arr.push(`${ReflectionQueryParamKeys.reflexionState}=${state}`)
  }

  if (sharedUsersDetail) {
    arr.push(
      `${ReflectionQueryParamKeys.SharedUsers}=${encodeURI(
        JSON.stringify(sharedUsersDetail),
      )}`,
    )
  }

  if (moments?.items !== undefined) {
    arr.push(
      `${ReflectionQueryParamKeys.moment}=${encodeURI(
        JSON.stringify(moments?.items),
      )}`,
    )
  }
  return arr.join('&').toString()
}

export function extractDataFromArray<T>(
  params: URLSearchParams,
  key: ReflectionQueryParamKeys,
) {
  const jsonString = params.get(key)

  let array: T[] = []

  if (jsonString !== null) {
    array = JSON.parse(decodeURI(jsonString || ''))
  }
  return array
}
