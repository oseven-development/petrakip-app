import { IonContent, IonPage } from '@ionic/react'
import { Header, MomentCard } from '../../components'
import { RouteComponentProps } from 'react-router'
import { LargeHeader } from '../../components/header'

interface Props
  extends RouteComponentProps<{
    id: string
  }> {}

export const MomentsDetailView: React.FC<Props> = ({ match, history }) => {
  return (
    <IonPage>
      <Header>Momente {match.params.id}</Header>
      <IonContent fullscreen>
        <LargeHeader>Momente {match.params.id}</LargeHeader>
        moments-details-dummy-content {match.params.id}
      </IonContent>
    </IonPage>
  )
}
