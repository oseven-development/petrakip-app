import React, { Dispatch, SetStateAction, useEffect } from 'react'
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLoading,
  IonModal,
  IonRow,
  IonSpinner,
  IonText,
} from '@ionic/react'
import { mic } from 'ionicons/icons'

import { Media } from '../../api/moment/saveMoment'

import { usePlatform, useVoiceMediaRecorder } from '../../hooks'

interface Props {
  setMedia: Dispatch<SetStateAction<Media>>
  disabled: boolean
  style?: any
}

const AudioRecorder: React.FC<Props> = ({ setMedia, disabled, style }) => {
  const platform = usePlatform()
  const [timer, setTimer] = React.useState(0)
  const [audioURL, isRecording, toggleRecording]: [
    Media,
    boolean,
    any, //TODO: how to handle function
  ] = useVoiceMediaRecorder(platform)

  useEffect(() => {
    setMedia(audioURL)
  }, [setMedia, audioURL])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(i => i + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <IonModal isOpen={isRecording} cssClass="my-custom-class">
        <IonGrid>
          <IonRow class="ion-align-items-center">
            <IonText>Aufnahme läuft {timer} Sekunden</IonText>
            <IonSpinner name="dots" />

            <IonButton
              expand="full"
              onClick={() => {
                toggleRecording()
                setTimer(0)
              }}
            >
              Aufnahme Beenden
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonModal>

      <IonButton
        color="primary"
        expand="block"
        disabled={disabled}
        onClick={() => {
          toggleRecording()
          setTimer(0)
        }}
        style={{ whiteSpace: 'break-spaces', ...style }}
      >
        <IonIcon slot="start" icon={mic} size="medium" />
        Audio {isRecording ? 'stoppen' : 'aufnehmen'}
      </IonButton>
    </>
  )
}

export { AudioRecorder }
