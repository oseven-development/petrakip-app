import React from 'react'
import {
  IonContent,
  IonPage,
  IonButton,
  useIonViewWillEnter,
} from '@ionic/react'
import { listAllReflectionsAPI } from '../../api/'
import { ReflectionsRouting } from '..'
import { Header, LargeHeader, ListComponent } from '../../components'
import { Reflection } from '../../API'
import { groupArrayByDate } from '../../utils/dateUtils'

import { book } from 'ionicons/icons'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps<{}> {}

export const ReflectionsListView: React.FC<Props> = ({ history }) => {
  const [state, setState] = React.useState<Reflection[]>([])
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
        Reflectionen
      </Header>
      <IonContent fullscreen>
        <LargeHeader>Reflectionen</LargeHeader>

        <ListComponent<Reflection>
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
