import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonButton,
  IonListHeader,
  IonList,
} from '@ionic/react'
import { Header } from '../../components'
import { RouteComponentProps } from 'react-router'
import { LargeHeader } from '../../components/header'

interface Props extends RouteComponentProps<{}> {}

export const MomentsListView: React.FC<Props> = ({ history }) => {
  return (
    <IonPage>
      <Header>Momente List View</Header>
      <IonContent fullscreen>
        <LargeHeader>Momente List View</LargeHeader>
        <IonButton routerLink="/moments/create" color="primary">
          Erstellen
        </IonButton>

        <IonListHeader lines="inset">
          <IonLabel>Moment liste</IonLabel>
        </IonListHeader>

        <IonList>
          <IonItem routerLink="/moments/details/1">
            <IonLabel>Moment 1</IonLabel>
          </IonItem>
          <IonItem routerLink="/moments/details/2">
            <IonLabel>Moment 2</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}
