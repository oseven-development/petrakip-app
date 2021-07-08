import React from 'react'
import { RouteComponentProps, useLocation } from 'react-router'

import {
  IonButton,
  IonContent,
  IonInput,
  IonLoading,
  IonPage,
} from '@ionic/react'

import { API, graphqlOperation } from 'aws-amplify'
import { Header } from '../../../components'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import {
  UpdateReflectionInput,
  Reflection,
  ReflectionState,
} from '../../../API'

import { updateReflection } from '../../../graphql/mutations'
import { ReflectionQueryParamKeys } from './reflectionQueryParamKeys'

interface Props extends RouteComponentProps<{}> {}

export const ReflectionsFollowUpQuestionView: React.FC<Props> = ({
  match,
  history,
}) => {
  const location = useLocation()
  const [loader, setLoader] = React.useState(true)
  const [question, setQuestion] = React.useState([
    'Wie fühlst du dich',
    'Bist du ein toller lehrmeister',
    'wft was steht hier!',
  ])
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
      <Header>reflectionsFollowUpQuestion</Header>
      <IonContent fullscreen>
        <h1>reflectionsFollowUpQuestion!</h1>
        {!loader &&
          question.map(items => (
            <React.Fragment key={items}>
              <h3>{items}</h3>
              <IonInput placeholder="deine Antwort"></IonInput>
            </React.Fragment>
          ))}

        <IonButton onClick={updateQuest}>Update ID</IonButton>
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
