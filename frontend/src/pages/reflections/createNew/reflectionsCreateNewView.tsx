import React from 'react'

import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemSliding,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRow,
  IonText,
} from '@ionic/react'

import { Header } from '../../../components'
import { RouteComponentProps } from 'react-router'
import { useLocation } from 'react-router-dom'
import { addCircle, aperture, save, star } from 'ionicons/icons'

import { delteReflectionAPI, saveReflectionAPI } from '../../../api/'

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
import {
  createReflectionUpdateObject,
  reflectionURItoState,
} from '../reflectionUtils'
import { CheckmarkCircleStateIcon } from '../../../utils/stateIcons'

interface Props extends RouteComponentProps<{}> {}

export interface State extends CreateReflectionInput {
  momentIDs: string[]
  momentObj: { id: string; title: string; createdAt: string }[]
  // sharedUsersDetail: ShareUser[] | null | undefined
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

const deleteSlot = (id: string | null | undefined) =>
  id
    ? () => {
        console.log(id)
        delteReflectionAPI(id)
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

  /*
    Display the Follow-Up-Question Pop-Up
    only when mounting the view
  */
  const entryReflexionState = params.get(
    ReflectionQueryParamKeys.reflexionState,
  )
  React.useEffect(() => {
    if (entryReflexionState === ReflectionState.awaitingFollowUpQuestions) {
      setShowFollowUpQuestions(true)
    }
  }, [entryReflexionState, setShowFollowUpQuestions])

  /*
    Update the State when the URI are changing
  */
  React.useEffect(() => {
    if (location.pathname === ReflectionsRouting.module) {
      /*
        create the State from the URI
      */
      const params = new URLSearchParams(location.search)
      const newState = reflectionURItoState(params)
      /*
        set the newState
      */
      setState(state => ({ ...state, ...newState }))
    }
  }, [location, setState])

  /*
    When the reflection is successful update at the server
    Update the URI as well to sync the state
   */
  const updateURIAfterUpdateRelfectionIsFinished = (result: Reflection) => {
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

  const shareSlot = (id: string | null | undefined) =>
    id ? (
      <ShareOverview
        id={id}
        //@ts-ignore
        sharedUsers={state.sharedUsersDetail || []}
        assetType={'Reflection'}
        shareAsset={user => {
          const sharedUsersDetail = state.sharedUsersDetail

          if (sharedUsersDetail) {
            const userExist = !sharedUsersDetail
              .map(item => item?.id)
              .includes(user.id)
            if (userExist) {
              sharedUsersDetail.push({ id: user.id, email: user.email })
              const value = encodeURI(JSON.stringify(sharedUsersDetail))
              UpdateURL([{ key: 'SharedUsers', value }])
            }
          }
        }}
        removeAsset={user => {
          const sharedUsersDetail = state.sharedUsersDetail
          const sharedUsersDetailFilterd = sharedUsersDetail?.filter(
            item => item?.id !== user.id,
          )
          const value = encodeURI(JSON.stringify(sharedUsersDetailFilterd))
          UpdateURL([{ key: 'SharedUsers', value }])
        }}
      />
    ) : null

  return (
    <IonPage>
      <Header
        shareSlot={shareSlot(state.id)}
        deleteSlot={deleteSlot(state.id)}
        customBackRoute="/reflections"
      >
        {state.id ? 'Reflexion bearbeiten' : 'Neue Reflexion erstellen'}
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
            <CheckmarkCircleStateIcon state={state.topic} />
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
            <CheckmarkCircleStateIcon state={state.title} />
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
            <CheckmarkCircleStateIcon state={state.content} />
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

            <CheckmarkCircleStateIcon
              state={state.momentIDs.length === 0 ? '' : 'fill'}
            />
          </IonItem>
          {state.momentObj.map(({ id, title, createdAt }) => {
            return (
              <IonItemSliding key={id} id={id}>
                <IonItem routerLink={`/moments/details/${id}`}>
                  <IonIcon icon={star} slot="start" />
                  <IonLabel>{title}</IonLabel>
                  <IonNote slot="end">
                    {getLocaleDateString(new Date(createdAt || ''))}
                  </IonNote>
                </IonItem>

                {/* <IonItemOptions side="end">
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
                </IonItemOptions> */}
              </IonItemSliding>
            )
          })}
        </IonList>

        {/* ############################ Buttons ############################ */}
      </IonContent>
      <IonRow>
        {/* ############################ Route FollowUpQuestion ############################ */}
        <IonCol>
          <IonButton
            expand="block"
            disabled={state.state === ReflectionState.started ? true : false}
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
            onClick={updateReflection}
            disabled={
              state.title && state.content && state.subTopic ? undefined : true
            }
          >
            {state.id ? 'Speichern' : 'Erstellen'}
            <IonIcon slot="start" icon={state.id ? save : addCircle}></IonIcon>
          </IonButton>
        </IonCol>
      </IonRow>
    </IonPage>
  )
}
