import { IonButton } from '@ionic/react'
import React, { Dispatch, SetStateAction, useEffect } from 'react'

import { Media } from '../../api/moment/saveMoment'

import { usePlatform } from '../../hooks/usePlatform'
import { useWebMediaRecorder, audioOptions } from '../../hooks/useWebMedia'
interface Props {
  setMedia: Dispatch<SetStateAction<Media>>
  disabled: boolean
}

const AudioRecorder: React.FC<Props> = ({ setMedia, disabled }) => {
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
    <IonButton color="primary" expand="full" disabled onClick={toggleRecording}>
      {/* Placeholder for later */}
      Audioaufnahme nicht verfügbar
    </IonButton>
  ) : (
    <IonButton
      color="primary"
      expand="full"
      disabled={disabled}
      onClick={toggleRecording}
    >
      Audioaufnahme {isRecording ? 'stoppen' : 'starten'}
    </IonButton>
  )
}

export { AudioRecorder }
