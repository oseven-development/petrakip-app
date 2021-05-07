import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../components'
import { RouteComponentProps } from 'react-router'

interface Props
  extends RouteComponentProps<{
    id: string
  }> {}

export const ReflectionsDetailView: React.FC<Props> = ({ match, history }) => {
  return (
    <IonPage>
      <Header>Reflektion Details</Header>
      <IonContent fullscreen>
        moments-details-dummy-content {match.params.id}
      </IonContent>
    </IonPage>
  )
}
