import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../components'

const Profile: React.FC = () => {
  return (
    <IonPage>
      <Header>profile</Header>
      <IonContent fullscreen>profile</IonContent>
    </IonPage>
  )
}

export { Profile }
