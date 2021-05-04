import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../components'

const Progress: React.FC = () => {
  return (
    <IonPage>
      <Header>Fortschritt</Header>
      <IonContent fullscreen>progress-dummy-content</IonContent>
    </IonPage>
  )
}

export { Progress }
