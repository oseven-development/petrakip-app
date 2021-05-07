import { IonContent, IonPage } from '@ionic/react'
import { RouteComponentProps } from 'react-router-dom'
import { Header } from '../../components'

interface Props extends RouteComponentProps<{}> {}

export const ProgressDetailView: React.FC<Props> = ({ history }) => {
  return (
    <IonPage>
      <Header>Fortschritt</Header>
      <IonContent fullscreen>progress-dummy-content</IonContent>
    </IonPage>
  )
}
