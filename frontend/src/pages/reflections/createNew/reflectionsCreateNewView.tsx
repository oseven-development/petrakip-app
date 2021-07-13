import React, { memo } from 'react'

import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
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
  IonRow,
  IonText,
  IonToast,
} from '@ionic/react'

import { Header } from '../../../components'
import { RouteComponentProps } from 'react-router'
import { useLocation } from 'react-router-dom'
import {
  addCircle,
  aperture,
  checkmarkCircle,
  checkmarkCircleOutline,
  download,
  star,
  trashOutline,
} from 'ionicons/icons'

import { saveReflectionAPI } from '../../../api/'

import {
  CreateReflectionInput,
  Reflection,
  ReflectionState,
} from '../../../API'
import { ReflectionsRouting } from './reflectionCreateNewRouting'
import { ReflectionQueryParamKeys } from './reflectionQueryParamKeys'
import { useUpdateQueryParamState } from './useUpdateQueryParamState'
import {
  getLocaleDateString,
  getLongDateString,
} from '../../../utils/dateUtils'
import { ShareOverview } from '../../../components/share/shareOverview'
import { useCustomLoaderOnTrigger } from '../../../hooks'

interface Props extends RouteComponentProps<{}> {}

interface State extends CreateReflectionInput {
  momentIDs: string[]
  momentObj: { id: string; title: string; createdAt: string }[]
}

interface CreateReflectionInputWithMomentIDs extends CreateReflectionInput {
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
  state: ReflectionState.started,
  deleted: false,
  //   sharedUsers: [String]
  //   comments: [Comment]
  //orientationQuestions: [OrientationQuestions]
  momentIDs: [],
  momentObj: [],
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

const createStateObject = (
  reactState: State,
): CreateReflectionInputWithMomentIDs => {
  const id = reactState.id

  const state: CreateReflectionInputWithMomentIDs = {
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

  if (reactState.state === ReflectionState.started) {
    state.state = ReflectionState.awaitingFollowUpQuestions
  }

  return state
}

const shareSlot = (id: string | null | undefined) =>
  id ? (
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
  ) : null

const deleteSlot = (id: string | null | undefined) =>
  id
    ? () => {
        console.log('delte')
      }
    : null

export const ReflectionsCreateNewView: React.FC<Props> = ({
  match,
  history,
}) => {
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
    if (entryReflexionState === ReflectionState.awaitingFollowUpQuestions) {
      setShowFollowUpQuestions(true)
    }
  }, [entryReflexionState, setShowFollowUpQuestions])

  React.useEffect(() => {
    const params = new URLSearchParams(location.search)

    const momentObj = params
      .get(ReflectionQueryParamKeys.moment)
      ?.split(',')
      .map(el => el.split('#'))
      .map(([id, title, createdAt]) => ({ id, title, createdAt }))

    const newState: State = {
      id: params.get(ReflectionQueryParamKeys.id) || null,
      createdAt: params.get(ReflectionQueryParamKeys.createdAt) || null,
      title: params.get(ReflectionQueryParamKeys.title) || '',
      content: params.get(ReflectionQueryParamKeys.report) || '',
      topic: params.get(ReflectionQueryParamKeys.topic) || '',
      subTopic: params.get(ReflectionQueryParamKeys.subTopic) || '',
      momentIDs: momentObj?.map(({ id }) => id) || [],
      momentObj: momentObj || [],
      state:
        (params.get(
          ReflectionQueryParamKeys.reflexionState,
        ) as ReflectionState) || ReflectionState.started,
    }

    if (location.pathname === ReflectionsRouting.module) {
      setState(state => ({ ...state, ...newState }))
    }
  }, [location, setState])

  const updateResult = (result: Reflection) => {
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
    if (result.state === ReflectionState.awaitingFollowUpQuestions) {
      setShowFollowUpQuestions(true)
    }
  }

  const [JSXLoader, , caller] = useCustomLoaderOnTrigger({
    promise: saveReflectionAPI,
    callback: updateResult,
    loadingMessage: 'Reflexion wird gespeichert...',
    toastMessage: 'Reflexion erfolgreich gespeichert!',
  })

  const graphQLcall = () => {
    caller(createStateObject(state))
  }

  return (
    <IonPage>
      <Header
        shareSlot={shareSlot(state.id)}
        deleteSlot={deleteSlot(state.id)}
        customBackRoute="/reflections"
      >
        Neue Reflexion erstellen
      </Header>
      <IonContent fullscreen>
        {/* ############################ Toast ############################ */}
        {JSXLoader}

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
          {state.momentObj.map(({ id, title, createdAt }) => {
            return (
              <IonItemSliding key={id} id={id}>
                <IonItem>
                  <IonIcon icon={star} slot="start" />
                  <IonLabel>{title}</IonLabel>
                  <IonNote slot="end">
                    {getLocaleDateString(new Date(createdAt || ''))}
                  </IonNote>
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
            )
          })}
        </IonList>

        {/* ############################ Buttons ############################ */}
        <IonGrid>
          <IonRow>
            {/* ############################ Route FollowUpQuestion ############################ */}
            <IonCol>
              <IonButton
                expand="block"
                disabled={
                  state.state === ReflectionState.started ? true : false
                }
                routerLink={`${ReflectionsRouting.followUpQuestion}${currentUrl}`}
              >
                Folgefragen
                <IonIcon slot="start" icon={aperture}></IonIcon>
              </IonButton>
            </IonCol>
            {/* ############################ Save the Reflection ############################ */}
            <IonCol>
              <IonButton
                expand="block"
                onClick={graphQLcall}
                disabled={
                  state.title && state.content && state.subTopic
                    ? undefined
                    : true
                }
              >
                {state.id ? 'Speichern' : 'Erstellen'}
                <IonIcon
                  slot="start"
                  icon={state.id ? download : addCircle}
                ></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
