import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../components'

export const ReflectionsView: React.FC = () => {
  return (
    <IonPage>
      <Header>Reflexionen</Header>
      <IonContent fullscreen>reflections-dummy-content</IonContent>
    </IonPage>
  )
}
