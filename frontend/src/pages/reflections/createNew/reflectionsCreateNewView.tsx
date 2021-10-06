import React from 'react'
import { RouteComponentProps } from 'react-router'
import { useLocation } from 'react-router-dom'

import { addCircle, aperture, save, star } from 'ionicons/icons'

import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRow,
  IonText,
  useIonViewDidEnter,
} from '@ionic/react'

import { Header, ShareOverview } from '../../../components'

import { useCustomLoaderOnTrigger, useDebounce } from '../../../hooks'

import { createReflectionUpdateObject } from '../reflectionUtils'

import {
  getLocaleDateString,
  getLongDateString,
  CheckmarkCircleStateIcon,
} from '../../../utils'

import { delteReflectionAPI, saveReflectionAPI } from '../../../api/'

import {
  CreateReflectionInput,
  Reflection,
  ReflectionState,
  SharedUsersDetailInput,
} from '../../../API'

import { ReflectionsRouting } from './reflectionCreateNewRouting'

import { CheckShareUser, ShareUser } from '../../../types/shareUser'

interface Props extends RouteComponentProps<{}> {}

export interface State extends CreateReflectionInput {
  momentIDs: string[]
  momentObj: { id: string; title: string; createdAt: string }[]
}

export interface CreateReflectionInputWithMomentIDs
  extends CreateReflectionInput {
  momentIDs: string[]
}

const defaultState: State = {
  title: '',
  topic: '',
  subTopic: '',
  state: ReflectionState.started,
  deleted: false,
  sharedUsersDetail: [],
  momentIDs: [],
  momentObj: [],
}

export const ReflectionsCreateNewView: React.FC<Props> = ({
  match,
  history,
}) => {
  const [showFollowUpQuestions, setShowFollowUpQuestions] = React.useState(
    false,
  )
  const [sharedItem, setSharedItem] = React.useState<boolean>(false)
  const [state, setState] = React.useState<State>(defaultState)
  const location = useLocation()

  /*
    When the reflection is successful update at the server
    Update the URI as well to sync the state
   */
  const updateURIAfterUpdateRelfectionIsFinished = (result: Reflection) => {
    setState(state => {
      state.createdAt = result.createdAt
      state.state = result.state
      state.id = result.id
      return { ...state }
    })
    // Update URI with new Parametes
    // Like ID and Creation Date
    // Check if the state is awaitingFollowUpQuestions and Display then PopUp
    if (result.state === ReflectionState.awaitingFollowUpQuestions) {
      setShowFollowUpQuestions(true)
    }
  }

  /*
    Inizialize the JSXLoader when updating the Reflection
  */
  const [JSXLoader, , triggerUpdateReflection] = useCustomLoaderOnTrigger({
    promise: saveReflectionAPI,
    callback: updateURIAfterUpdateRelfectionIsFinished,
    loadingMessage: 'Reflexion wird gespeichert...',
    toastMessage: 'Reflexion erfolgreich gespeichert!',
  })

  const updateReflection = () => {
    triggerUpdateReflection(createReflectionUpdateObject(state))
  }

  /*
  Add and Remove a Share
  Render The ShareOverview
  */
  const shareAsset = (user: CheckShareUser) => {
    setState(state => {
      if (state.sharedUsersDetail && state.sharedUsers) {
        state.sharedUsers.push(user.id)
        state.sharedUsersDetail.push({ id: user.id, email: user.email })
      } else {
        state.sharedUsers = [user.id]
        state.sharedUsersDetail = [{ id: user.id, email: user.email }]
      }
      return { ...state }
    })
  }
  const removeAsset = (user: ShareUser) => {
    const sharedUsersDetail = state.sharedUsersDetail
    const sharedUsers = state.sharedUsers

    const sharedUsersFilterd = sharedUsers?.filter(id => id !== user.id)

    const sharedUsersDetailFilterd = sharedUsersDetail?.filter(
      item => item?.id !== user.id,
    )

    setState(state => {
      if (state.sharedUsersDetail && state.sharedUsers) {
        state.sharedUsers = sharedUsersFilterd
        state.sharedUsersDetail = sharedUsersDetailFilterd
      }
      return { ...state }
    })
  }
  const shareSlot = (id: string) => (
    <ShareOverview
      id={id}
      sharedUsers={(state.sharedUsersDetail as SharedUsersDetailInput[]) || []}
      assetType={'Reflection'}
      shareAsset={shareAsset}
      removeAsset={removeAsset}
    />
  )

  /*
  Delete a Reflection
  */
  const deleteSlot = (id: string) => () => {
    delteReflectionAPI(id)
    history.push('/reflections')
  }

  const params = new URLSearchParams(location.search)
  // Load URL-Data into State
  useIonViewDidEnter(() => {
    setState(defaultState)
    const urlState = params.get('state')
    if (urlState) {
      const stateJson = JSON.parse(urlState)
      setState(stateJson)
      setSharedItem(stateJson.sharedState)
      if (
        stateJson.state === ReflectionState.awaitingFollowUpQuestions &&
        !stateJson.sharedState
      ) {
        setShowFollowUpQuestions(true)
      }
    }
  }, [location.search])

  // React.useEffect(() => {
  //   const jsonState = JSON.stringify(debouncedSearchTerm)
  //   history.replace(`${history.location.pathname}?state=${jsonState}`)
  // }, [debouncedSearchTerm, history])

  function updateURLandRoute(url: string) {
    history.push(`${url}?state=${JSON.stringify(state)}`)
  }

  function createRouterLink(url: string) {
    return `${url}?state=${JSON.stringify(state)}`
  }

  // NEW!!!!! #######################################################

  const [debouncedSearchTerm, pendingState] = useDebounce(state, 300)

  // Load URL-Data into State
  useIonViewDidEnter(() => {
    setState(defaultState)
    const params = new URLSearchParams(location.search)
    const urlState = params.get('state')
    if (urlState) {
      const stateJson = JSON.parse(urlState)
      setState(stateJson)
      if (
        stateJson.state === ReflectionState.awaitingFollowUpQuestions &&
        !stateJson.sharedState
      ) {
        setShowFollowUpQuestions(true)
      }
    }
  }, [location.search])

  React.useEffect(() => {
    //@ts-ignore
    setSharedItem(state.sharedState)
  }, [state])

  React.useEffect(() => {
    const jsonState = JSON.stringify(debouncedSearchTerm)
    history.push(`${history.location.pathname}?state=${jsonState}`)
  }, [debouncedSearchTerm, history])

  return (
    <IonPage>
      <Header
        disabled={sharedItem}
        iconSlot={state.id ? [shareSlot(state.id)] : []}
        deleteSlot={state.id ? deleteSlot(state.id) : undefined}
        customBackRoute="/reflections"
      >
        {!sharedItem
          ? state.id
            ? 'Reflexion bearbeiten'
            : 'Neue Reflexion erstellen'
          : 'Geteilte Reflexion'}
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
                updateURLandRoute(ReflectionsRouting.followUpQuestion),
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
            routerLink={createRouterLink(ReflectionsRouting.selectTopic)}
            routerDirection="forward"
            disabled={sharedItem}
          >
            <IonLabel>
              <IonText color="medium">
                <h6> {state.topic} </h6>
              </IonText>
              {state.subTopic === '' ? 'Thema wählen' : state.subTopic}
            </IonLabel>
            <CheckmarkCircleStateIcon state={state.topic} />
          </IonItem>
          {/* ############################  Title ############################ */}
          <IonItemDivider>
            <IonText color="medium">Title</IonText>
          </IonItemDivider>
          <IonItem lines="none" disabled={sharedItem}>
            <IonInput
              value={state.title}
              placeholder="Title"
              onIonChange={e => {
                const k = e.detail.value
                setState(state => {
                  state.title = k
                  return { ...state }
                })
              }}
            ></IonInput>
            <CheckmarkCircleStateIcon state={state.title} />
          </IonItem>

          {/* ############################  Report ############################ */}
          <IonItemDivider>
            <IonText color="medium">Reflexionsbericht</IonText>
          </IonItemDivider>
          <IonItem
            routerLink={createRouterLink(ReflectionsRouting.writeReport)}
            routerDirection="forward"
          >
            <IonLabel>
              {state.content
                ? state.content?.slice(0, 20).padEnd(23, '.')
                : 'Schreibe eine Zusammenfassung'}
            </IonLabel>
            <CheckmarkCircleStateIcon state={state.content} />
          </IonItem>

          {/* ############################  Momentes ############################ */}
          <IonItemDivider>
            <IonText color="medium">Momente</IonText>
          </IonItemDivider>
          <IonItem
            disabled={sharedItem}
            routerLink={createRouterLink(ReflectionsRouting.selectMoments)}
            routerDirection="forward"
          >
            <IonLabel>Neuen Momente hinzufügen</IonLabel>
            <IonNote slot="end">{state.momentIDs.length}</IonNote>

            <CheckmarkCircleStateIcon
              state={state.momentIDs.length === 0 ? '' : 'fill'}
            />
          </IonItem>
          {state.momentObj.map(({ id, title, createdAt }) => (
            <IonItem key={id} id={id} routerLink={`/moments/details/${id}`}>
              <IonIcon icon={star} slot="start" />
              <IonLabel>{title}</IonLabel>
              <IonNote slot="end">
                {getLocaleDateString(new Date(createdAt || ''))}
              </IonNote>
            </IonItem>
          ))}
        </IonList>
        {/* ############################ Buttons ############################ */}
      </IonContent>
      {!sharedItem && (
        <IonRow>
          {/* ############################ Route FollowUpQuestion ############################ */}
          <IonCol>
            <IonButton
              expand="block"
              disabled={state.state === ReflectionState.started ? true : false}
              routerLink={createRouterLink(ReflectionsRouting.followUpQuestion)}
              routerDirection="forward"
            >
              Folgefragen
              <IonIcon slot="start" icon={aperture}></IonIcon>
            </IonButton>
          </IonCol>
          {/* ############################ Save the Reflection ############################ */}
          <IonCol>
            <IonButton
              expand="block"
              onClick={updateReflection}
              disabled={
                state.title && state.content && state.subTopic
                  ? undefined
                  : true
              }
            >
              {state.id ? 'Speichern' : 'Erstellen'}
              <IonIcon
                slot="start"
                icon={state.id ? save : addCircle}
              ></IonIcon>
            </IonButton>
          </IonCol>
        </IonRow>
      )}
    </IonPage>
  )
}
