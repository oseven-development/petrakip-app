import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../components'

const Reflections: React.FC = () => {
  return (
    <IonPage>
      <Header>Reflexionen</Header>
      <IonContent fullscreen>reflections-dummy-content</IonContent>
    </IonPage>
  )
}

export { Reflections }
