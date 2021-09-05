import { IonButton, IonIcon } from '@ionic/react'
import { mic } from 'ionicons/icons'
import React, { Dispatch, SetStateAction, useEffect } from 'react'

import { Media } from '../../api/moment/saveMoment'
import { useAudio } from '../../hooks/useNativeMedia'

import { usePlatform } from '../../hooks/usePlatform'
import { useWebMediaRecorder, audioOptions } from '../../hooks/useWebMedia'

interface Props {
  setMedia: Dispatch<SetStateAction<Media>>
  disabled: boolean
  style?: any
}

const AudioRecorder: React.FC<Props> = ({ setMedia, disabled, style }) => {
  const { audioCapture, doAudioCapture } = useAudio()
  const platform = usePlatform()
  const [audioURL, isRecording, toggleRecording]: [
    Media,
    boolean,
    any, //TODO: how to handle function
  ] = useWebMediaRecorder(audioOptions)

  useEffect(() => {
    // setMedia(audioURL)
    //setMedia({ name: 'audio', data: audioCapture, type: 'wav' })

    async function fetchData() {
      // You can await here
      console.log('start Fetch')
      console.log(audioCapture)
      let blob = await fetch(audioCapture).then(r => r.blob())
      console.log(blob.type)
      console.log(blob.size)

      // ...
    }
    fetchData()
  }, [audioCapture, setMedia])

  return platform === 'ios' ? (
    <IonButton
      color="primary"
      expand="block"
      onClick={() => {
        doAudioCapture()
      }}
      style={{ whiteSpace: 'break-spaces', ...style }}
    >
      <IonIcon slot="start" icon={mic} size="medium" />
      Audio nicht verfügbar
      {audioCapture}
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
