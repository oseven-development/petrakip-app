import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../components'

export const MomentsView: React.FC = () => {
  return (
    <IonPage>
      <Header>Momente</Header>
      <IonContent fullscreen>moments-dummy-content</IonContent>
    </IonPage>
  )
}
