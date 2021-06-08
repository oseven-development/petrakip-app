import React from 'react'
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonItem,
  IonPage,
  IonText,
  IonTextarea,
} from '@ionic/react'
import { Header } from '../../../components'
import { RouteComponentProps } from 'react-router'
import { useUpdateQueryParamState } from './useUpdateQueryParamState'

import { ReflectionQueryParamKeys } from './reflectionQueryParamKeys'
import { ReflectionsRouting } from './reflectionCreateNewRouting'

interface Props extends RouteComponentProps<{}> {}

export const ReflectionWriteReportView: React.FC<Props> = ({ history }) => {
  const { currentUrl, UpdateURL } = useUpdateQueryParamState(history)
  return (
    <IonPage>
      <Header>Reflexionsbericht</Header>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader color="tertiary">
            <IonCardTitle>Orientierungsfragen</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonText>
              <ol>
                <li> Wie hast du das umgesetzt?</li>
                <li>Was hat gut funktioniert?</li>
                <li>Was kannst du noch verbessern?</li>
                <li>Welche Theorien können dir dabei helfen?</li>
              </ol>
            </IonText>
          </IonCardContent>
        </IonCard>
        <IonButton
          routerLink={`${ReflectionsRouting.module}${currentUrl}`}
          color="primary"
        >
          Speichern
        </IonButton>
        <IonItem>
          <IonText color="primary">
            <h1>Reflexionsbericht</h1>
          </IonText>
        </IonItem>
        <IonItem>
          <IonTextarea
            autoGrow
            rows={10}
            debounce={1000}
            onIonChange={e =>
              UpdateURL(ReflectionQueryParamKeys.report, e.detail.value!)
            }
            placeholder="Enter more information here..."
          ></IonTextarea>
        </IonItem>
      </IonContent>
    </IonPage>
  )
}
