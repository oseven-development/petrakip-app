import {
  IonButton,
  IonHeader,
  IonIcon,
  IonModal,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { closeCircle, text } from 'ionicons/icons'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Media } from '../../api/moment/saveMoment'

interface Props {
  setMedia: Dispatch<SetStateAction<Media>>
  media?: Media
  disabled: boolean
  style?: any
}

const TextRecorder: React.FC<Props> = ({
  setMedia,
  disabled,
  style,
  media,
}) => {
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
          value={media?.data ? media.data : undefined}
          placeholder="Text hier eingeben"
          onIonChange={e =>
            setMedia({
              name: `note`,
              data: e.detail.value!,
              type: 'text',
            })
          }
        ></IonTextarea>

        <IonButton expand="block" onClick={() => setShowModal(false)}>
          <IonIcon slot="start" icon={closeCircle}></IonIcon>
          Eingabe beenden
        </IonButton>
      </IonModal>
      <IonButton
        color="primary"
        expand="block"
        disabled={disabled}
        style={{ whiteSpace: 'break-spaces', ...style }}
        onClick={() => setShowModal(true)}
      >
        <IonIcon slot="start" icon={text} size="medium" />
        Text eingeben
      </IonButton>
    </>
  )
}

export { TextRecorder }
