import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../components'

export const ProfileView: React.FC = () => {
  return (
    <IonPage>
      <Header>Profil</Header>
      <IonContent fullscreen>profile-dummy-content</IonContent>
    </IonPage>
  )
}
