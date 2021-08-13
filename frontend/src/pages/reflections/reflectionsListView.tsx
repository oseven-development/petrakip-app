import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react'
import { book } from 'ionicons/icons'

import {
  CreateButton,
  Header,
  LargeHeader,
  ListComponent,
} from '../../components'

import { groupArrayByDate } from '../../utils'
import { ReflectionsRouting } from '..'
import { Reflection } from '../../API'
import { getReflectionAPI, listAllReflectionsAPI } from '../../api/'
import { reflectionStatetoURI } from './reflectionUtils'

interface Props extends RouteComponentProps<{}> {}

export const ReflectionsListView: React.FC<Props> = ({ history }) => {
  const [state, setState] = React.useState<Reflection[]>([])
  useIonViewWillEnter(() => {
    listAllReflectionsAPI().then(setState).catch(console.error)
  }, [])

  const onClickRouting = (reflection: Reflection, sharedItem: boolean) => {
    getReflectionAPI(reflection.id)
      .then(ref => {
        if (ref) {
          history.push(
            `${ReflectionsRouting.module}?${
              sharedItem ? 'sharedItem=true&' : ''
            }${reflectionStatetoURI(ref)}`,
          )
        }
      })
      .catch(console.error)
  }

  return (
    <IonPage>
      <Header
        iconSlot={[<CreateButton routerLink={ReflectionsRouting.module} />]}
      >
        Reflexionen
      </Header>
      <IonContent fullscreen>
        <LargeHeader>Reflexionen</LargeHeader>
        <ListComponent<Reflection>
          elements={state}
          onClickHandler={onClickRouting}
          iconFunction={() => book}
          sortFunction={groupArrayByDate}
        ></ListComponent>
      </IonContent>
    </IonPage>
  )
}
