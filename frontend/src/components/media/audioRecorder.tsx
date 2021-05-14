import { IonButton, IonPage } from '@ionic/react'
import { useEffect } from 'react'

import { usePlatform } from '../../hooks/usePlatform'
import { useWebMediaRecorder, audioOptions } from '../../hooks/useWebMedia'

interface Props {
  setMedia: React.Dispatch<React.SetStateAction<any>>
}

const AudioRecorder: React.FC<Props> = ({ setMedia }) => {
  const platform = usePlatform()
  const [audioURL, isRecording, toggleRecording]: any = useWebMediaRecorder(
    audioOptions,
  )

  useEffect(() => {
    setMedia(audioURL)
  }, [audioURL, setMedia])

  return platform === 'ios' ? (
    <IonPage>
      <div>not implemented</div>
    </IonPage>
  ) : (
    <IonButton onClick={toggleRecording}>
      Web Audio {isRecording ? 'stoppen' : 'starten'}
    </IonButton>
  )
}

export { AudioRecorder }
