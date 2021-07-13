import { IonContent, IonPage, IonButton, IonList, IonItem } from '@ionic/react'
import { Header } from '../../components'
import { RouteComponentProps } from 'react-router-dom'
import Auth from '@aws-amplify/auth'
import { usePlatform } from '../../hooks/usePlatform'

interface Props extends RouteComponentProps<{}> {}

export const ProfileDetailView: React.FC<Props> = ({ history }) => {
  const platform = usePlatform()

  return (
    <IonPage>
      <Header
        shareSlot={
          <IonButton onClick={() => Auth.signOut()}>Ausloggen</IonButton>
        }
      >
        Profil
      </Header>
      <IonContent fullscreen>
        <IonList>
          <IonItem>{platform}</IonItem>
          <IonItem routerLink="/profile/changepassword">
            Password ändern
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}
