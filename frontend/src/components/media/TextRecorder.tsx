import {
  IonButton,
  IonHeader,
  IonModal,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Media } from '../../api/moment/saveMoment'

interface Props {
  setMedia: Dispatch<SetStateAction<Media>>
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
              name: `note`,
              data: e.detail.value!,
              type: 'text',
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
