import { checkmarkCircle, checkmarkCircleOutline } from 'ionicons/icons'

import { SubTopicItem } from './subjectArea'

export function totalDone(subListItems: SubTopicItem[]): number {
  return subListItems.filter(({ done }) => done).length
}

export function badgeStatus(
  subListItems: SubTopicItem[],
): 'medium' | 'primary' | 'success' {
  const done = totalDone(subListItems)
  const total = subListItems.length
  return done === 0 ? 'medium' : done !== total ? 'primary' : 'success'
}

export function currentSelectedTopic(
  currentSelected: string | undefined,
  id: string,
): 'tertiary' | undefined {
  return currentSelected === id ? 'tertiary' : undefined
}

export function textLable(
  currentSelected: string | undefined,
  id: string,
): 'medium' | undefined {
  return currentSelected === undefined || currentSelected === id
    ? undefined
    : 'medium'
}

export function doneStatusText(subListItems: SubTopicItem[]) {
  return `${totalDone(subListItems)}/${subListItems.length}`
}

export function checkmarkIcon(
  done: boolean,
): { icon: string; color: 'success' | 'medium' } {
  const icon = done ? checkmarkCircle : checkmarkCircleOutline
  const color = done ? 'success' : 'medium'
  return { icon, color }
}
