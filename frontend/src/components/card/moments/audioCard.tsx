import React from 'react'

import { IonCol, IonButton, IonIcon, IonGrid, IonRow } from '@ionic/react'

import { playCircle, pauseCircle } from 'ionicons/icons'

export interface AudioVariant {
  variant: 'audio'
  audio: string
}
export const AudioVariantCard: React.FC<AudioVariant> = props => {
  const [play, setPlay] = React.useState(true)
  const clickButton = () => {
    setPlay(e => !e)
  }
  return (
    <IonGrid>
      <IonRow className="ion-align-items-center">
        <IonCol></IonCol>
        <IonCol>
          <IonButton size="large" fill="clear" onClick={clickButton}>
            <IonIcon
              slot="icon-only"
              color="primary"
              icon={play ? playCircle : pauseCircle}
            />
          </IonButton>
        </IonCol>
        <IonCol></IonCol>
      </IonRow>
    </IonGrid>
  )
}
