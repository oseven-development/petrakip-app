import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../components'

export const ProgressView: React.FC = () => {
  return (
    <IonPage>
      <Header>Fortschritt</Header>
      <IonContent fullscreen>progress-dummy-content</IonContent>
    </IonPage>
  )
}
