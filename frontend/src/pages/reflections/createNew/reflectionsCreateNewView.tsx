import React, { memo } from 'react'

import {
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

import {
  listReflexionCall,
  createReflextionAPI,
} from '../../../api/reflection/createReflection'

import { CreateReflexionInput, ReflexionState } from '../../../API'
import { ReflectionsRouting } from './reflectionCreateNewRouting'
import { ReflectionQueryParamKeys } from './reflectionQueryParamKeys'
import { useUpdateQueryParamState } from './useUpdateQueryParamState'

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

const createStateObject = (queryUrl: string) => {
  const params = new URLSearchParams(queryUrl)
  const id = params.get(ReflectionQueryParamKeys.id)

  const state: State = {
    id,
    createdAt: new Date().toISOString(),
    title: params.get(ReflectionQueryParamKeys.title) || '',
    content: params.get(ReflectionQueryParamKeys.report) || '',
    topic: params.get(ReflectionQueryParamKeys.topic) || '',
    subTopic: params.get(ReflectionQueryParamKeys.subTopic) || '',
    momentIDs: params.get(ReflectionQueryParamKeys.moment)?.split(',') || [],
  }
  if (!id) {
    delete state.id
  }
  if (id) {
    delete state.createdAt
  }

  return state
}

export const ReflectionsCreateNewView: React.FC<Props> = ({
  match,
  history,
}) => {
  const [message, setMessage] = React.useState({ message: '', display: false })
  const [loader, setLoader] = React.useState(false)
  const [state, setState] = React.useState<State>(defaultState)
  const { currentUrl, UpdateURL } = useUpdateQueryParamState(history)
  const location = useLocation()

  React.useEffect(() => {
    const params = new URLSearchParams(location.search)

    const id = params.get(ReflectionQueryParamKeys.id)
    const createdAt = params.get(ReflectionQueryParamKeys.createdAt)

    const newState: State = {
      id,
      createdAt,
      title: params.get(ReflectionQueryParamKeys.title) || '',
      content: params.get(ReflectionQueryParamKeys.report) || '',
      topic: params.get(ReflectionQueryParamKeys.topic) || '',
      subTopic: params.get(ReflectionQueryParamKeys.subTopic) || '',
      momentIDs: params.get(ReflectionQueryParamKeys.moment)?.split(',') || [],
    }

    if (location.pathname === ReflectionsRouting.module) {
      setState(state => ({ ...state, ...newState }))
    }
  }, [location, setState])

  const graphQLcall = () => {
    const start = new Date().getTime()
    setLoader(true)
    createReflextionAPI(createStateObject(location.search))
      .then(result => {
        const end = new Date().getTime()
        const time = end - start
        setTimeout(() => {
          setLoader(false)
          setMessage({
            message: 'Reflexion erfolgreich gespeichert!',
            display: true,
          })
          console.log(result.id)
          if (result.id) UpdateURL(ReflectionQueryParamKeys.id, result.id)
          // if (result.createdAt)
          //   UpdateURL(ReflectionQueryParamKeys.createdAt, result.createdAt)
        }, 1000 - time)
      })
      .catch(() => {
        setLoader(false)
      })
  }

  return (
    <IonPage>
      <Header>Neue Reflexion erstellen</Header>
      <IonContent fullscreen>
        <IonLoading isOpen={loader} message={'Reflexion wird gespeichert...'} />
        <IonToast
          isOpen={message.display}
          onDidDismiss={() => setMessage({ message: '', display: false })}
          message={message.message}
          duration={2000}
          position="top"
          translucent
          color="primary"
        />

        <IonList>
          <IonItemDivider>
            <IonText color="medium">Erstellt am:</IonText>
          </IonItemDivider>
          <IonItem>
            <IonText color="secondary">
              <h6>{state.createdAt}</h6>
            </IonText>
          </IonItem>
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
              {state.subTopic === 'Später wählen'
                ? 'Thema wählen'
                : state.subTopic}
            </IonLabel>
            <CheckmarkStateIcon state={state.subTopic} />
          </IonItem>
          <IonItemDivider>
            <IonText color="medium">Title</IonText>
          </IonItemDivider>
          <IonItem lines="none">
            <IonInput
              value={state.title}
              placeholder="Title (optional)"
              onIonChange={e =>
                UpdateURL(ReflectionQueryParamKeys.title, e.detail.value!)
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

        <IonButton
          onClick={graphQLcall}
          disabled={
            state.title && state.content && state.subTopic ? undefined : true
          }
        >
          {state.id ? 'Speichern' : 'Erstellen'}
        </IonButton>

        {location.search.split('&').map(item => (
          <p key={item}>{item}</p>
        ))}
      </IonContent>
    </IonPage>
  )
}
