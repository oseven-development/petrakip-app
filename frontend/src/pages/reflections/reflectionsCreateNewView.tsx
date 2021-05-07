import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../components'
import { RouteComponentProps } from 'react-router'

interface Props
  extends RouteComponentProps<{
    id: string
  }> {}

export const ReflectionsCreateNewView: React.FC<Props> = ({
  match,
  history,
}) => {
  return (
    <IonPage>
      <Header>Reflektions Erstellen</Header>
      <IonContent fullscreen>moments-details-dummy-content</IonContent>
    </IonPage>
  )
}
