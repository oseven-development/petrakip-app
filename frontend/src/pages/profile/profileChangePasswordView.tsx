import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../components'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps<{}> {}

export const ProfileChangePasswordView: React.FC<Props> = ({ history }) => {
  return (
    <IonPage>
      <Header>Password ändern</Header>
      <IonContent fullscreen>profile-dummy-content</IonContent>
    </IonPage>
  )
}
