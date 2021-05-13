import { IonButton, IonContent, IonPage, IonImg } from '@ionic/react'
import { Header } from '../../components'
import { RouteComponentProps } from 'react-router'
import { useAudio, usePhoto, useVideo } from '../../hooks/useMedia'
interface Props
  extends RouteComponentProps<{
    id: string
  }> {}

export const MomentsCreateNewView: React.FC<Props> = ({ match, history }) => {
  const { photoCapture, doPhotoCapture }: any = usePhoto()
  const { videoCapture, doVideoCapture }: any = useVideo()
  const { audioCapture, doAudioCapture }: any = useAudio()
  console.log(photoCapture)
  console.log(videoCapture)
  console.log(audioCapture)
  return (
    <IonPage>
      <Header>Momente Erstellen</Header>
      <IonContent fullscreen>
        moments-details-dummy-content
        <p>
          Capture Video:{' '}
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
      </IonContent>
      <IonButton onClick={doPhotoCapture}>Foto aufnehmen</IonButton>
      <IonButton onClick={doVideoCapture}>Video aufnehmen</IonButton>
      <IonButton onClick={doAudioCapture}>Audio aufnehmen</IonButton>
    </IonPage>
  )
}
