import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../components'

export const MomentsListView: React.FC = () => {
  return (
    <IonPage>
      <Header>Momente List View</Header>
      <IonContent fullscreen>moments-details-dummy-content</IonContent>
    </IonPage>
  )
}
