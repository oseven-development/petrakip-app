import { IonButton, IonIcon } from '@ionic/react'
import { mic } from 'ionicons/icons'
import React, { Dispatch, SetStateAction, useEffect } from 'react'

import { Media } from '../../api/moment/saveMoment'

import { usePlatform } from '../../hooks/usePlatform'
import { useWebMediaRecorder, audioOptions } from '../../hooks/useWebMedia'
interface Props {
  setMedia: Dispatch<SetStateAction<Media>>
  disabled: boolean
  style?: any
}

const AudioRecorder: React.FC<Props> = ({ setMedia, disabled, style }) => {
  const platform = usePlatform()
  const [audioURL, isRecording, toggleRecording]: [
    Media,
    boolean,
    any, //TODO: how to handle function
  ] = useWebMediaRecorder(audioOptions)

  useEffect(() => {
    setMedia(audioURL)
  }, [audioURL, setMedia])

  return platform === 'ios' ? (
    <IonButton
      color="primary"
      expand="block"
      disabled
      onClick={toggleRecording}
      style={{ whiteSpace: 'break-spaces', ...style }}
    >
      <IonIcon slot="start" icon={mic} size="medium" />
      Audio nicht verfügbar
    </IonButton>
  ) : (
    <IonButton
      color="primary"
      expand="block"
      disabled={disabled}
      onClick={toggleRecording}
      style={{ whiteSpace: 'break-spaces', ...style }}
    >
      <IonIcon slot="start" icon={mic} size="medium" />
      Audio {isRecording ? 'stoppen' : 'aufnehmen'}
    </IonButton>
  )
}

export { AudioRecorder }
