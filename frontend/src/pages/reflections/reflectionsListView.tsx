import React from 'react'
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
import { listAllReflectionsAPI } from '../../api/'
import { ReflectionsRouting } from '..'

export const ReflectionsListView: React.FC = () => {
  const [state, setState] = React.useState<any[]>([])
  React.useEffect(() => {
    listAllReflectionsAPI().then(setState).catch(console.error)
  }, [])
  return (
    <IonPage>
      <Header>Reflexionen</Header>
      <IonContent fullscreen>
        <IonButton routerLink={ReflectionsRouting.module} color="primary">
          Erstellen
        </IonButton>

        <IonListHeader lines="inset">
          <IonLabel>Reflexion liste</IonLabel>
        </IonListHeader>

        <IonList>
          {state.map(item => (
            <IonItem key={item.id}>
              <h1 style={{ fontSize: '0.7em' }}>
                {item.createdAt} <br /> {item.title} <br /> Moments{' '}
                {item?.moments?.items?.length}
              </h1>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}
