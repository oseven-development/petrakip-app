import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonButton,
  IonListHeader,
  IonList,
  IonRouterLink,
} from '@ionic/react'
import { Header, MomentCard } from '../../components'
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

        <MomentCard
          momentId={1}
          title="Text Card"
          variant="text"
          text="asd"
        ></MomentCard>
        <MomentCard
          momentId={2}
          title="Image Card"
          variant="image"
          image="asd"
        ></MomentCard>
        <MomentCard
          momentId={3}
          title="Audio Card"
          variant="audio"
          audio="asd"
        ></MomentCard>
        <MomentCard
          momentId={4}
          title="Video Card"
          variant="video"
          video="asd"
        ></MomentCard>
      </IonContent>
    </IonPage>
  )
}
