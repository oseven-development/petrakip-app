import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../components'

export const MomentsCreateNewView: React.FC = () => {
  return (
    <IonPage>
      <Header>Momente Erstellen</Header>
      <IonContent fullscreen>moments-details-dummy-content</IonContent>
    </IonPage>
  )
}
