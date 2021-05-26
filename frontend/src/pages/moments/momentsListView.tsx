import { IonContent, IonPage, IonButton } from '@ionic/react'
import { Header } from '../../components'
import { RouteComponentProps } from 'react-router'
interface Props extends RouteComponentProps<{}> {}

export const MomentsListView: React.FC<Props> = ({ history }) => {
  return (
    <IonPage>
      <Header>Momente List View</Header>
      <IonContent fullscreen>
        <IonButton routerLink="/moments/create" color="primary">
          Erstellen
        </IonButton>
        <br></br>
        Moment Content
      </IonContent>
    </IonPage>
  )
}
