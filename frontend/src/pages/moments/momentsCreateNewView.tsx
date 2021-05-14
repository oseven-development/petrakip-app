import { IonButton, IonContent, IonPage, IonImg } from '@ionic/react'
import { Header } from '../../components'
import { RouteComponentProps } from 'react-router'
import { useAudio, usePhoto, useVideo } from '../../hooks/useNativeMedia'
import { usePlatform } from '../../hooks/usePlatform'
import { useState } from 'react'
import { AudioRecorder } from '../../components/media/audioRecorder'
import { VideoRecorder } from '../../components/media/videoRecorder'
import { ImageRecorder } from '../../components/media/imageRecorder'
interface Props
  extends RouteComponentProps<{
    id: string
  }> {}

export const MomentsCreateNewView: React.FC<Props> = ({ match, history }) => {
  const { photoCapture, doPhotoCapture }: any = usePhoto()
  const { videoCapture, doVideoCapture }: any = useVideo()
  const { audioCapture, doAudioCapture }: any = useAudio()
  const [media, setMedia]: any = useState(null)

  const platform = usePlatform()

  console.log(media)

  return (
    <IonPage>
      <Header>Momente Erstellen</Header>
      <IonContent fullscreen>
        {platform}

        <AudioRecorder setMedia={setMedia} />
        <VideoRecorder setMedia={setMedia} />
        <ImageRecorder setMedia={setMedia} />
        {media?.type?.includes('audio') ? (
          <audio src={media.data} controls />
        ) : media?.type?.includes('video') ? (
          <video src={media.data} controls />
        ) : media?.type?.includes('image') ? (
          <img src={media.data} alt="test" />
        ) : (
          <div>nothing yet</div>
        )}
      </IonContent>
      <IonButton onClick={doPhotoCapture}>Foto aufnehmen</IonButton>
      <IonButton onClick={doVideoCapture}>Video aufnehmen</IonButton>
      <IonButton onClick={doAudioCapture}>Audio aufnehmen</IonButton>
    </IonPage>
  )
}
