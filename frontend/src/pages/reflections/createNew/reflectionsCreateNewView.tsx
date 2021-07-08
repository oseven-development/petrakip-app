import React, { memo } from 'react'

import {
  IonAlert,
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonLoading,
  IonNote,
  IonPage,
  IonText,
  IonToast,
  useIonAlert,
  useIonLoading,
} from '@ionic/react'

import { Header } from '../../../components'
import { RouteComponentProps } from 'react-router'
import { useLocation } from 'react-router-dom'
import {
  checkmarkCircle,
  checkmarkCircleOutline,
  star,
  trashOutline,
} from 'ionicons/icons'

import { listAllReflectionsAPI, saveReflectionAPI } from '../../../api/'

import { CreateReflexionInput, ReflexionState } from '../../../API'
import { ReflectionsRouting } from './reflectionCreateNewRouting'
import { ReflectionQueryParamKeys } from './reflectionQueryParamKeys'
import { useUpdateQueryParamState } from './useUpdateQueryParamState'
import { getLongDateString } from '../../../utils/dateUtils'
import { ShareOverview } from '../../../components/share/shareOverview'

interface Props extends RouteComponentProps<{}> {}

interface State extends CreateReflexionInput {
  momentIDs: string[]
}

const defaultState: State = {
  // createdAt: new Date().toISOString(),
  title: 'asd',
  //contentType: ContentType
  //asset: S3Object
  //content: String
  topic: '1 Fachbereich',
  subTopic: '',
  //niveau: String
  //indicators: [String]
  state: ReflexionState.started,
  deleted: false,
  //   sharedUsers: [String]
  //   comments: [Comment]
  //orientationQuestions: [OrientationQuestions]
  momentIDs: [],
}

const CheckmarkStateIcon: React.FC<{ state: string | null | undefined }> = ({
  state,
}) => (
  <IonIcon
    icon={state !== '' ? checkmarkCircle : checkmarkCircleOutline}
    color={state !== '' ? 'success' : 'medium'}
    slot="end"
  />
)

const createStateObject = (reactState: State) => {
  const id = reactState.id

  const state: State = {
    id,
    createdAt: reactState.createdAt || new Date().toISOString(),
    title: reactState.title || '',
    content: reactState.content || '',
    topic: reactState.topic || '',
    subTopic: reactState.subTopic || '',
    momentIDs: reactState.momentIDs,
  }
  if (!id) {
    delete state.id
  }

  if (reactState.state === ReflexionState.started) {
    state.state = ReflexionState.awaitingFollowUpQuestions
  }

  return state
}

export const ReflectionsCreateNewView: React.FC<Props> = ({
  match,
  history,
}) => {
  const [message, setMessage] = React.useState({ message: '', display: false })
  const [loader, setLoader] = React.useState(false)

  const [showFollowUpQuestions, setShowFollowUpQuestions] = React.useState(
    false,
  )

  const [state, setState] = React.useState<State>(defaultState)
  const { currentUrl, UpdateURL } = useUpdateQueryParamState(history)
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const entryReflexionState = params.get(
    ReflectionQueryParamKeys.reflexionState,
  )

  React.useEffect(() => {
    if (entryReflexionState === ReflexionState.awaitingFollowUpQuestions) {
      setShowFollowUpQuestions(true)
    }
  }, [entryReflexionState, setShowFollowUpQuestions])

  React.useEffect(() => {
    const params = new URLSearchParams(location.search)

    const newState: State = {
      id: params.get(ReflectionQueryParamKeys.id) || null,
      createdAt: params.get(ReflectionQueryParamKeys.createdAt) || null,
      title: params.get(ReflectionQueryParamKeys.title) || '',
      content: params.get(ReflectionQueryParamKeys.report) || '',
      topic: params.get(ReflectionQueryParamKeys.topic) || '',
      subTopic: params.get(ReflectionQueryParamKeys.subTopic) || '',
      momentIDs: params.get(ReflectionQueryParamKeys.moment)?.split(',') || [],
      state:
        (params.get(
          ReflectionQueryParamKeys.reflexionState,
        ) as ReflexionState) || ReflexionState.started,
    }

    if (location.pathname === ReflectionsRouting.module) {
      setState(state => ({ ...state, ...newState }))
    }
  }, [location, setState])

  const graphQLcall = () => {
    const start = new Date().getTime()
    setLoader(true)
    saveReflectionAPI(createStateObject(state))
      .then(result => {
        const end = new Date().getTime()
        const time = end - start
        setTimeout(() => {
          setLoader(false)
          setMessage({
            message: 'Reflexion erfolgreich gespeichert!',
            display: true,
          })

          const params = []
          if (result.id)
            params.push({ key: ReflectionQueryParamKeys.id, value: result.id })
          if (result.createdAt)
            params.push({
              key: ReflectionQueryParamKeys.createdAt,
              value: result.createdAt,
            })
          if (result.state) {
            params.push({
              key: ReflectionQueryParamKeys.reflexionState,
              value: result.state,
            })
          }

          // Update URI with new Parametes
          // Like ID and Creation Date
          UpdateURL(params)

          // Check if the state is awaitingFollowUpQuestions and Display then PopUp
          if (result.state === ReflexionState.awaitingFollowUpQuestions) {
            setShowFollowUpQuestions(true)
          }
        }, 1000 - time)
      })
      .catch(() => {
        setLoader(false)
      })
  }

  return (
    <IonPage>
      <Header
        shareSlot={
          <ShareOverview
            sharedUsers={[]}
            assetType={'Reflexion'}
            shareAsset={(user: any) => {
              console.log('share add')
            }}
            removeAsset={(user: any) => {
              console.log('share remove')
            }}
          />
        }
        deleteSlot={() => {
          console.log('delte')
        }}
        customBackRoute="/reflections"
      >
        Neue Reflexion erstellen
      </Header>
      <IonContent fullscreen>
        {/* ############################ Loading ############################ */}
        <IonLoading isOpen={loader} message={'Reflexion wird gespeichert...'} />

        {/* ############################ Toast ############################ */}
        <IonToast
          isOpen={message.display}
          onDidDismiss={() => setMessage({ message: '', display: false })}
          message={message.message}
          duration={2000}
          position="top"
          translucent
          color="primary"
        />

        {/* ############################ Alert ############################ */}
        <IonAlert
          isOpen={showFollowUpQuestions}
          onDidDismiss={() => setShowFollowUpQuestions(false)}
          header={'Follow-Up-Questions'}
          message={
            'Für diese Reflexion gibt es showFollowUpQuestions, jetzt beantworten?'
          }
          buttons={[
            'später',
            {
              text: 'Ja!',
              handler: () =>
                history.push(
                  `${ReflectionsRouting.followUpQuestion}${currentUrl}`,
                ),
            },
          ]}
        />

        <IonList>
          {/* ############################ created at ############################ */}
          <IonItemDivider>
            <IonText color="medium">Erstellt am:</IonText>
          </IonItemDivider>
          <IonItem>
            <IonText color="secondary">
              <h6>
                {getLongDateString(
                  state.createdAt || '',
                  'Noch nicht erstellt',
                )}
              </h6>
            </IonText>
          </IonItem>
          {/* ############################ topic ############################ */}
          <IonItemDivider>
            <IonText color="medium">Thema</IonText>
          </IonItemDivider>
          <IonItem
            lines="none"
            routerLink={`${ReflectionsRouting.selectTopic}${currentUrl}`}
          >
            <IonLabel>
              <IonText color="medium">
                <h6> {state.topic} </h6>
              </IonText>
              {state.subTopic === '' ? 'Thema wählen' : state.subTopic}
            </IonLabel>
            <CheckmarkStateIcon state={state.topic} />
          </IonItem>
          {/* ############################  Title ############################ */}
          <IonItemDivider>
            <IonText color="medium">Title</IonText>
          </IonItemDivider>
          <IonItem lines="none">
            <IonInput
              value={state.title}
              placeholder="Title (optional)"
              onIonChange={e =>
                UpdateURL([
                  {
                    key: ReflectionQueryParamKeys.title,
                    value: e.detail.value!,
                  },
                ])
              }
            ></IonInput>
            <CheckmarkStateIcon state={state.title} />
          </IonItem>
          <IonItemDivider>
            <IonText color="medium">Reflexionsbericht</IonText>
          </IonItemDivider>
          <IonItem
            routerLink={`${ReflectionsRouting.writeReport}${currentUrl}`}
          >
            <IonLabel>
              {state.content !== ''
                ? state.content?.slice(0, 20).padEnd(23, '.')
                : 'Schreibe eine Zusammenfassung'}
            </IonLabel>
            <CheckmarkStateIcon state={state.content} />
          </IonItem>

          {/* ############################  Momentes ############################ */}
          <IonItemDivider>
            <IonText color="medium">Momente</IonText>
          </IonItemDivider>
          <IonItem
            routerLink={`${ReflectionsRouting.selectMoments}${currentUrl}`}
          >
            <IonLabel>Neuen Momente hinzufügen</IonLabel>
            <IonNote slot="end">{state.momentIDs.length}</IonNote>

            <CheckmarkStateIcon
              state={state.momentIDs.length === 0 ? '' : 'fill'}
            />
          </IonItem>
          {state.momentIDs.map(item => (
            <IonItemSliding key={item} id={item}>
              <IonItem>
                <IonIcon icon={star} slot="start" />
                <IonLabel>{item}</IonLabel>
                <IonNote slot="end">12.03.2020</IonNote>
              </IonItem>

              <IonItemOptions side="end">
                <IonItemOption
                  expandable
                  color="danger"
                  onClick={e => {
                    //@ts-ignore
                    document.getElementById(item).close()
                  }}
                >
                  <IonIcon slot="icon-only" icon={trashOutline} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>

        {/* ############################ Route FollowUpQuestion ############################ */}
        <IonButton
          disabled={state.state === ReflexionState.started ? true : false}
          routerLink={`${ReflectionsRouting.followUpQuestion}${currentUrl}`}
        >
          FollowUpQuestion
        </IonButton>

        {/* ############################ Save the Reflection ############################ */}
        <IonButton
          onClick={graphQLcall}
          disabled={
            state.title && state.content && state.subTopic ? undefined : true
          }
        >
          {state.id ? 'Speichern' : 'Erstellen'}
        </IonButton>

        {/* ############################ DEBBUG! ############################ */}
        {location.search.split('&').map(item => (
          <p key={item}>{item}</p>
        ))}
      </IonContent>
    </IonPage>
  )
}
