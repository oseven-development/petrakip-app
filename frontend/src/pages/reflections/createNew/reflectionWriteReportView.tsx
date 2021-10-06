import React from 'react'
import { RouteComponentProps } from 'react-router'

import { save, closeCircle } from 'ionicons/icons'

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

import { ReflectionsRouting } from './reflectionCreateNewRouting'
import { Auth } from 'aws-amplify'

interface Props extends RouteComponentProps<{}> {}

export const ReflectionWriteReportView: React.FC<Props> = ({
  history,
  location,
}) => {
  const [state, setState] = React.useState<{ content: string }>()
  const [isSharedReflection, setIsShareReflection] = React.useState<boolean>(
    false,
  )

  useIonViewDidEnter(async () => {
    const params = new URLSearchParams(location.search)
    const urlState = params.get('state')
    if (urlState) {
      const stateJson = JSON.parse(urlState)
      setState(stateJson)
      setIsShareReflection(
        stateJson.owner !== (await Auth.currentUserInfo()).username,
      )
    }
  }, [location.search])

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
            disabled={isSharedReflection}
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
        expand="block"
        routerLink={`${ReflectionsRouting.module}?state=${JSON.stringify(
          state,
        )}`}
        routerDirection="back"
      >
        {isSharedReflection ? (
          <>
            <IonIcon slot="start" icon={closeCircle}></IonIcon> Schließen
          </>
        ) : (
          <>
            <IonIcon slot="start" icon={save}></IonIcon> Speichern
          </>
        )}
      </IonButton>
    </IonPage>
  )
}
