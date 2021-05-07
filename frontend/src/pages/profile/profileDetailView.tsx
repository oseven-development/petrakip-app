import { IonContent, IonPage, IonButton } from '@ionic/react'
import { Header } from '../../components'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps<{}> {}

export const ProfileDetailView: React.FC<Props> = ({ history }) => {
  return (
    <IonPage>
      <Header>Profil</Header>
      <IonContent fullscreen>
        <IonButton routerLink="/profile/changepassword" color="primary">
          Password ändern
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
