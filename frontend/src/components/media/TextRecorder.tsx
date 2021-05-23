import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonModal,
  IonPage,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonModal,
} from '@ionic/react'
import React, { useRef, useState } from 'react'

import { usePlatform } from '../../hooks/usePlatform'
import { Header, LargeHeader } from '../header'

interface Props {
  setMedia: React.Dispatch<React.SetStateAction<any>>
}

const TextRecorder: React.FC<Props> = ({ setMedia }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <IonModal isOpen={showModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Momentbeschreibung</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonTextarea
          className="ion-padding"
          autofocus
          placeholder="Text hier eingeben"
          onIonChange={e =>
            setMedia({
              data: e.detail.value!,
              type: 'text',
              displayData: e.detail.value!,
            })
          }
        ></IonTextarea>

        <IonButton
          color="primary"
          expand="full"
          onClick={() => setShowModal(false)}
        >
          Eingabe beenden
        </IonButton>
      </IonModal>
      <IonButton
        color="primary"
        expand="full"
        onClick={() => setShowModal(true)}
      >
        Text eingeben
      </IonButton>
    </>
  )
}

export { TextRecorder }
