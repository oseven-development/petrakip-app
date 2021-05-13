import { IonButton, IonContent, IonPage, IonImg } from '@ionic/react'
import { Header } from '../../components'
import { RouteComponentProps } from 'react-router'
import { useCameraPhoto, useCameraVideo } from '../../hooks/useCamera'
interface Props
  extends RouteComponentProps<{
    id: string
  }> {}

export const MomentsCreateNewView: React.FC<Props> = ({ match, history }) => {
  const { photo, takePhoto }: any = useCameraPhoto()
  const { doMediaCapture }: any = useCameraVideo()
  console.log(photo)
  return (
    <IonPage>
      <Header>Momente Erstellen</Header>
      <IonContent fullscreen>moments-details-dummy-content</IonContent>
      <IonButton onClick={takePhoto}>Foto aufnehmen</IonButton>
      {photo && <IonImg src={photo.webviewPath} />}
      <IonButton onClick={doMediaCapture}>
        Video aufnehmen Not finished
      </IonButton>
    </IonPage>
  )
}
