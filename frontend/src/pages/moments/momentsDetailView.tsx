import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../components'

export const MomentDetailView: React.FC = () => {
  return (
    <IonPage>
      <Header>Momente Details</Header>
      <IonContent fullscreen>moments-details-dummy-content</IonContent>
    </IonPage>
  )
}
