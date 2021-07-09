import React from 'react'
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonButton,
  IonListHeader,
  IonList,
  useIonViewWillEnter,
} from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { IonContent, IonPage, IonItem, IonButton, IonList } from '@ionic/react'
import { Header } from '../../components'
import { listAllReflectionsAPI } from '../../api/'
import { ReflectionsRouting } from '..'
import { Header, LargeHeader, ListComponent } from '../../components'
import { Reflexion } from '../../API'
import { groupArrayByDate } from '../../utils/dateUtils'

import { book } from 'ionicons/icons'

interface Props extends RouteComponentProps<{}> {}

export const ReflectionsListView: React.FC<Props> = ({ history }) => {
  const [state, setState] = React.useState<Reflexion[]>([])
  useIonViewWillEnter(() => {
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

        <ListComponent<Reflexion>
          elements={state}
          onClickHandler={({ id, title, topic, subTopic, content }) => {
            history.push(
              `${ReflectionsRouting.module}?id=${id}&title=${title}&topic=${topic}&sub-topic=${subTopic}&report=${content}`,
            )
          }}
          iconFunction={() => book}
          sortFunction={groupArrayByDate}
        ></ListComponent>
      </IonContent>
    </IonPage>
  )
}
