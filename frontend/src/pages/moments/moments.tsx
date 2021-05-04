import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../components'

const Moments: React.FC = () => {
  return (
    <IonPage>
      <Header>Momente</Header>
      <IonContent fullscreen>moments-dummy-content</IonContent>
    </IonPage>
  )
}

export { Moments }
