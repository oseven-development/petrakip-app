import { ReflectionState } from '../../API'
import {
  CreateReflectionInputWithMomentIDs,
  State,
} from './createNew/reflectionsCreateNewView'

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
