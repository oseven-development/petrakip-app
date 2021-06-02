import { IonContent, IonPage, IonButton } from '@ionic/react'
import { Header } from '../../components'
import { RouteComponentProps } from 'react-router-dom'
import Auth from '@aws-amplify/auth'
import { usePlatform } from '../../hooks/usePlatform'

interface Props extends RouteComponentProps<{}> {}

export const ProfileDetailView: React.FC<Props> = ({ history }) => {
  const platform = usePlatform()

  return (
    <IonPage>
      <Header>Profil</Header>
      <IonContent fullscreen>
        {platform}

        <IonButton routerLink="/profile/changepassword" color="primary">
          Password ändern
        </IonButton>
        <IonButton onClick={() => Auth.signOut}>Ausloggen</IonButton>
      </IonContent>
    </IonPage>
  )
}
