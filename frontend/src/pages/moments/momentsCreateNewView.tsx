import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../components'
import { RouteComponentProps } from 'react-router'

interface Props
  extends RouteComponentProps<{
    id: string
  }> {}

export const MomentsCreateNewView: React.FC<Props> = ({ match, history }) => {
  return (
    <IonPage>
      <Header>Momente Erstellen</Header>
      <IonContent fullscreen>moments-details-dummy-content</IonContent>
    </IonPage>
  )
}
