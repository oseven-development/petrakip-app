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
  IonSpinner,
  IonText,
  IonTextarea,
  useIonViewDidEnter,
} from '@ionic/react'

// import { Header } from '../../../components'

import { ReflectionsRouting } from './reflectionCreateNewRouting'
import { useDebounce } from '../../../hooks'

interface Props extends RouteComponentProps<{}> {}

export const ReflectionWriteReportView: React.FC<Props> = ({
  history,
  location,
}) => {
  const [state, setState] = React.useState<{ content: string }>()
  const [debouncedSearchTerm, pendingState] = useDebounce(state, 1000)

  useIonViewDidEnter(() => {
    const params = new URLSearchParams(location.search)
    const K = params.get('state')
    if (K) {
      const stateJson = JSON.parse(K)
      setState(stateJson)
    }
  }, [])

  React.useEffect(() => {
    const jsonState = JSON.stringify(debouncedSearchTerm)
    history.replace(`${history.location.pathname}?state=${jsonState}`)
  }, [debouncedSearchTerm, history])

  return (
    <IonPage>
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
            autoGrow
            value={state?.content}
            onIonChange={e => {
              const k = e.detail.value
              if (k) {
                //@ts-ignore
                setState(state => {
                  //@ts-ignore
                  state.content = k
                  return { ...state }
                })
              }
            }}
            placeholder="Enter more information here..."
          ></IonTextarea>
        </IonGrid>
      </IonContent>
      <IonButton
        disabled={pendingState}
        expand="block"
        routerLink={`${ReflectionsRouting.module}?state=${JSON.stringify(
          state,
        )}`}
        routerDirection="back"
      >
        {pendingState ? (
          <IonSpinner />
        ) : (
          <IonIcon slot="start" icon={save}></IonIcon>
        )}

        {!pendingState && ' Speichern'}
      </IonButton>
    </IonPage>
  )
}
