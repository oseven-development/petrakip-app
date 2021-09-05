import { IonButton, IonIcon } from '@ionic/react'
import { mic } from 'ionicons/icons'
import React, { Dispatch, SetStateAction, useEffect } from 'react'

import { Media } from '../../api/moment/saveMoment'

import { usePlatform } from '../../hooks/usePlatform'
import { useVoiceMediaRecorder } from '../../hooks/useWebMedia'

interface Props {
  setMedia: Dispatch<SetStateAction<Media>>
  disabled: boolean
  style?: any
}

const AudioRecorder: React.FC<Props> = ({ setMedia, disabled, style }) => {
  // const { audioCapture, doAudioCapture } = useAudio()
  const platform = usePlatform()
  const [audioURL, isRecording, toggleRecording]: [
    Media,
    boolean,
    any, //TODO: how to handle function
  ] = useVoiceMediaRecorder(platform)

  useEffect(() => {
    setMedia(audioURL)
  }, [setMedia, audioURL])

  return (
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
