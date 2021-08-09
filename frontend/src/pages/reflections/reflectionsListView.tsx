import React from 'react'
import {
  IonContent,
  IonPage,
  IonButton,
  useIonViewWillEnter,
} from '@ionic/react'
import { getReflectionAPI, listAllReflectionsAPI } from '../../api/'
import { ReflectionsRouting } from '..'
import { Header, LargeHeader, ListComponent } from '../../components'
import { Reflection } from '../../API'
import { groupArrayByDate } from '../../utils/dateUtils'

import { book } from 'ionicons/icons'
import { RouteComponentProps } from 'react-router-dom'
import { reflectionStatetoURI } from './reflectionUtils'

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
        Reflexionen
      </Header>
      <IonContent fullscreen>
        <LargeHeader>Reflexionen</LargeHeader>
        <ListComponent<Reflection>
          elements={state}
          onClickHandler={reflection => {
            getReflectionAPI(reflection.id)
              .then(ref => {
                if (ref) {
                  history.push(
                    `${ReflectionsRouting.module}?${reflectionStatetoURI(ref)}`,
                  )
                }
              })
              .catch(console.error)
          }}
          iconFunction={() => book}
          sortFunction={groupArrayByDate}
        ></ListComponent>
      </IonContent>
    </IonPage>
  )
}
