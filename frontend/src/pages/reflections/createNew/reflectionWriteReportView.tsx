import React from 'react'
import { RouteComponentProps } from 'react-router'

import { save } from 'ionicons/icons'

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonText,
  IonTextarea,
  useIonViewDidEnter,
} from '@ionic/react'

// import { Header } from '../../../components'

import { useUpdateQueryParamState } from './useUpdateQueryParamState'
import { ReflectionQueryParamKeys } from './reflectionQueryParamKeys'
import { ReflectionsRouting } from './reflectionCreateNewRouting'

interface Props extends RouteComponentProps<{}> {}

export const ReflectionWriteReportView: React.FC<Props> = ({
  history,
  location,
}) => {
  const [state, setState] = React.useState('')
  const { currentUrl, UpdateURL } = useUpdateQueryParamState(history)
  // console.log('component render')

  useIonViewDidEnter(() => {
    const params = new URLSearchParams(location.search)
    const content = params.get(ReflectionQueryParamKeys.report)
    setState(content || '')
  }, [])

  React.useEffect(() => {
    UpdateURL([
      {
        key: ReflectionQueryParamKeys.report,
        value: state,
      },
    ])
  }, [state, UpdateURL])

  return (
    <IonPage>
      {/* Header cause an input-delay */}
      {/* <Header customBackRoute={`${ReflectionsRouting.module}${currentUrl}`}>
        Reflexionsbericht
      </Header> */}

      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader color="tertiary">
            <IonText>Orientierungsfragen</IonText>
          </IonCardHeader>

          <IonCardContent>
            <ol>
              <li>Wie hast du das umgesetzt?</li>
              <li>Was hat gut funktioniert?</li>
              <li>Was kannst du noch verbessern?</li>
              <li>Welche Theorien können dir dabei helfen?</li>
            </ol>
          </IonCardContent>
        </IonCard>

        <IonGrid class="ion-padding-start ion-padding-end">
          <IonText color="primary">
            <h1>Reflexionsbericht</h1>
          </IonText>
          <IonTextarea
            debounce={300}
            autoGrow
            value={state}
            onIonChange={e => {
              setState(e.detail.value!)
            }}
            placeholder="Enter more information here..."
          ></IonTextarea>
        </IonGrid>
      </IonContent>
      <IonButton
        expand="block"
        routerLink={`${ReflectionsRouting.module}${currentUrl}`}
        routerDirection="back"
      >
        <IonIcon slot="start" icon={save}></IonIcon>
        Speichern
      </IonButton>
    </IonPage>
  )
}
