import React from 'react'
import { IonContent, IonPage, IonItem, IonButton, IonList } from '@ionic/react'
import { Header } from '../../components'
import { listAllReflectionsAPI } from '../../api/'
import { ReflectionsRouting } from '..'
import { LargeHeader } from '../../components/header'

export const ReflectionsListView: React.FC = () => {
  const [state, setState] = React.useState<any[]>([])
  React.useEffect(() => {
    listAllReflectionsAPI().then(setState).catch(console.error)
  }, [])
  return (
    <IonPage>
      <Header
        shareSlot={
          <IonButton routerLink={ReflectionsRouting.module} color="primary">
            Erstellen
          </IonButton>
        }
      >
        Reflexionen
      </Header>
      <IonContent fullscreen>
        <LargeHeader>Reflexionen</LargeHeader>

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
