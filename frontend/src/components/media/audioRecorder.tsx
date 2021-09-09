import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { IonButton, IonIcon, IonModal, IonSpinner, IonText } from '@ionic/react'
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
      <IonModal isOpen={isRecording}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <IonIcon icon={mic} style={{ fontSize: 80 }} />
            <IonText>Aufnahme läuft {timer} Sekunden</IonText>
            <IonSpinner name="dots" />

            <IonButton
              expand="block"
              onClick={() => {
                toggleRecording()
                setTimer(0)
              }}
            >
              Aufnahme Beenden
            </IonButton>
          </div>
        </div>
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
