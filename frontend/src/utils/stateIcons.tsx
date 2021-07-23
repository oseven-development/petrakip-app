// React.FC<>

import { IonIcon } from '@ionic/react'
import { checkmarkCircle, checkmarkCircleOutline } from 'ionicons/icons'

export function CheckmarkCircleStateIcon({
  state,
}: {
  state: string | null | undefined
}) {
  return (
    <IonIcon
      icon={state !== '' ? checkmarkCircle : checkmarkCircleOutline}
      color={state !== '' ? 'success' : 'medium'}
      slot="end"
    />
  )
}
