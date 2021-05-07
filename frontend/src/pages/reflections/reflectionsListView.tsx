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

export const ReflectionsListView: React.FC = () => {
  return (
    <IonPage>
      <Header>Reflexionen</Header>
      <IonContent fullscreen>
        <IonButton routerLink="/reflections/create" color="primary">
          Erstellen
        </IonButton>

        <IonListHeader lines="inset">
          <IonLabel>Reflexion liste</IonLabel>
        </IonListHeader>

        <IonList>
          <IonItem routerLink="/reflections/details/1">
            <IonLabel>Reflexion 1</IonLabel>
          </IonItem>
          <IonItem routerLink="/reflections/details/2">
            <IonLabel>Reflexion 2</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}
