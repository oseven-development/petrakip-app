import React from 'react'

import { IonCol, IonButton, IonIcon, IonGrid, IonRow } from '@ionic/react'

import { playCircle, pauseCircle } from 'ionicons/icons'

export interface AudioVariantProps {
  variant: 'audio'
  audioSrc: string
}

export const AudioVariantCardBody: React.FC<AudioVariantProps> = props => {
  const [play, setPlay] = React.useState(true)
  const clickButton = () => {
    setPlay(e => !e)
  }
  return (
    <IonGrid>
      <IonRow className="ion-align-items-center">
        <IonCol className="ion-text-center">
          <IonButton size="large" fill="clear" onClick={clickButton}>
            <IonIcon
              slot="icon-only"
              color="primary"
              icon={play ? playCircle : pauseCircle}
            />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}
