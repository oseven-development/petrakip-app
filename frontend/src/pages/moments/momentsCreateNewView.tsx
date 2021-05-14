import { IonButton, IonContent, IonPage, IonImg } from '@ionic/react'
import { Header } from '../../components'
import { RouteComponentProps } from 'react-router'
import { useAudio, usePhoto, useVideo } from '../../hooks/useNativeMedia'
import { useWebMediaRecorder } from '../../hooks/useWebMedia'
import { usePlatform } from '../../hooks/usePlatform'
interface Props
  extends RouteComponentProps<{
    id: string
  }> {}

export const MomentsCreateNewView: React.FC<Props> = ({ match, history }) => {
  const { photoCapture, doPhotoCapture }: any = usePhoto()
  const { videoCapture, doVideoCapture }: any = useVideo()
  const { audioCapture, doAudioCapture }: any = useAudio()
  const [audioURL, isRecording, toggleRecording]: any = useWebMediaRecorder()
  const platform = usePlatform()

  console.log(photoCapture)
  console.log(videoCapture)
  console.log(audioCapture)
  return (
    <IonPage>
      <Header>Momente Erstellen</Header>
      <IonContent fullscreen>
        {platform}
        <p>
          Capture Video:
          <input
            type="file"
            accept="video/*"
            id="capture"
            capture="camcorder"
          />
        </p>
        <p>
          Capture Audio: <input type="file" accept="audio/*" capture />
        </p>
        <p>
          Capture Photo: <input type="file" capture="user" accept="image/*" />
        </p>
        <IonButton onClick={toggleRecording}>
          Web Audio {isRecording ? 'stoppen' : 'starten'}
        </IonButton>
        <audio src={audioURL} controls />
      </IonContent>
      <IonButton onClick={doPhotoCapture}>Foto aufnehmen</IonButton>
      <IonButton onClick={doVideoCapture}>Video aufnehmen</IonButton>
      <IonButton onClick={doAudioCapture}>Audio aufnehmen</IonButton>
    </IonPage>
  )
}
