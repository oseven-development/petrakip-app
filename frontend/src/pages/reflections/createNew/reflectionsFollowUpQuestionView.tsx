import React from 'react'
import { RouteComponentProps, useLocation } from 'react-router'

import {
  IonButton,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
} from '@ionic/react'

import { API, graphqlOperation } from 'aws-amplify'
import { Header, LargeHeader } from '../../../components'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import {
  UpdateReflectionInput,
  Reflection,
  ReflectionState,
} from '../../../API'

import { updateReflection } from '../../../graphql/mutations'
import { ReflectionQueryParamKeys } from './reflectionQueryParamKeys'
import { followUpQuestions } from '../../../data/reflectionFollowUpQuestions'

interface Props extends RouteComponentProps<{}> {}

export const ReflectionsFollowUpQuestionView: React.FC<Props> = ({
  match,
  history,
}) => {
  const location = useLocation()
  const [loader, setLoader] = React.useState(true)
  const [question, setQuestion] = React.useState(followUpQuestions)
  React.useEffect(() => {})

  const updateQuest = async () => {
    const params = new URLSearchParams(location.search)
    const id = params.get(ReflectionQueryParamKeys.id)
    if (id) {
      const input: UpdateReflectionInput = {
        id,
        // TODO implementation needed
        // only dummyvalues!
        orientationQuestions: [
          { question: 'dummy', answer: 'sample' },
          { question: 'dummy', answer: 'sample' },
        ],
        state: ReflectionState.completed,
      }

      const res = (await API.graphql(
        graphqlOperation(updateReflection, { input }),
      )) as GraphQLResult<{ createReflexion: Reflection }>
      if (res.errors) throw res.errors
      if (res.data) console.log(res.data)
    }
  }

  return (
    <IonPage>
      <Header>Folge Fragen</Header>
      <IonContent fullscreen>
        <LargeHeader>Folge Fragen</LargeHeader>
        <IonList>
          {!loader &&
            question.map(items => (
              <IonItem key={items.question}>
                <IonLabel position="stacked">{items.question}</IonLabel>
                <IonInput placeholder="deine Antwort"></IonInput>
              </IonItem>
            ))}
        </IonList>
        <IonButton onClick={updateQuest}>beantworten</IonButton>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={loader}
          onDidDismiss={() => setLoader(false)}
          message={'Fragen werden berechnet...'}
          duration={2500}
        />
      </IonContent>
    </IonPage>
  )
}
