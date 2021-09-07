import React from 'react'
import { RouteComponentProps } from 'react-router'

import { useLocation } from 'react-router-dom'

import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'

import { checkmarkCircle } from 'ionicons/icons'

import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  useIonViewDidEnter,
} from '@ionic/react'

import { Header, LargeHeader } from '../../../components'

import { updateReflection } from '../../../graphql/mutations'
import { followUpQuestions } from '../../../data/reflectionFollowUpQuestions'

import {
  UpdateReflectionInput,
  Reflection,
  ReflectionState,
} from '../../../API'

import { ReflectionsRouting } from './reflectionCreateNewRouting'

interface Props extends RouteComponentProps<{}> {}

export const ReflectionsFollowUpQuestionView: React.FC<Props> = ({
  match,
  history,
}) => {
  const location = useLocation()

  const [state, setState] = React.useState<{
    id: string
    state: ReflectionState
  }>()
  const [loader, setLoader] = React.useState(true)
  const [question, setQuestion] = React.useState(followUpQuestions)

  // Load URL-Data into State
  useIonViewDidEnter(() => {
    const params = new URLSearchParams(location.search)
    const urlState = params.get('state')
    if (urlState) {
      const stateJson = JSON.parse(urlState)
      setState(stateJson)
    }
  }, [location.search])

  const updateQuestion = async () => {
    if (state?.id) {
      const input: UpdateReflectionInput = {
        id: state?.id,
        // TODO implementation needed
        // only dummyvalues!
        orientationQuestions: [
          { question: 'frage 1', answer: 'sample answer' },
          { question: 'frage 2', answer: 'sample answer' },
          { question: 'frage 3', answer: 'sample answer' },
        ],
        state: ReflectionState.completed,
      }

      const res = (await API.graphql(
        graphqlOperation(updateReflection, { input }),
      )) as GraphQLResult<{ createReflexion: Reflection }>
      if (res.errors) throw res.errors

      //@ts-ignore
      setState(state => {
        //@ts-ignore
        state.state = ReflectionState.completed

        return { ...state }
      })
    }
  }

  React.useEffect(() => {
    const jsonState = JSON.stringify(debouncedSearchTerm)
    history.push(`${history.location.pathname}?state=${jsonState}`)
  }, [history, debouncedSearchTerm])

  return (
    <IonPage>
      <Header
        customBackRoute={`${ReflectionsRouting.module}?state=${JSON.stringify(
          state,
        )}`}
      >
        Folgefragen
      </Header>
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
        <IonLoading
          isOpen={loader}
          onDidDismiss={() => setLoader(false)}
          message={'Fragen werden berechnet...'}
          duration={2500}
        />
      </IonContent>
      <IonButton expand="block" onClick={updateQuestion}>
        <IonIcon slot="start" icon={checkmarkCircle}></IonIcon>
        beantworten
      </IonButton>
    </IonPage>
  )
}
