import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Auth } from 'aws-amplify'

import { addCircle, save, star, starOutline } from 'ionicons/icons'

import {
  IonContent,
  IonPage,
  IonItem,
  IonInput,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonToast,
  useIonViewWillEnter,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from '@ionic/react'

import {
  LargeHeader,
  Header,
  ShareOverview,
  AudioRecorder,
  VideoRecorder,
  ImageRecorder,
  TextRecorder,
  DisplayMedia,
} from '../../components'

import {
  getMomentAPI,
  getMomentAsset,
  removeMomentAPI,
  saveMomentAPI,
} from '../../api/'

import { Media } from '../../api/moment/saveMoment'
import { ShareUser } from '../../types/shareUser'
import { momentTags } from '../../data/momentTags'
import { useCustomLoaderOnTrigger } from '../../hooks'

export interface Moment {
  title: string
  tags: string[]
}

interface Props extends RouteComponentProps<{}> {
  id: string
}

export const MomentsDetailView: React.FC<Props> = props => {
  const { match, history }: any = props
  const [isToast, setIsToast] = useState({
    present: false,
    color: 'danger',
    message: 'Du hast keinen Titel für den Moment definiert',
  })
  const [media, setMedia] = useState<Media>({
    type: '',
    data: '',
    name: '',
  })
  const [moment, setMoment] = useState<any>({
    title: '',
    tags: [''],
  })
  const [isSharedMoment, setIsSharedMoment] = useState<boolean>(false)

  useIonViewWillEnter(() => {
    if (match?.params?.id) {
      getMomentAPI({ id: match?.params?.id })
        .then(async res => {
          // Graphql returns a success query with null
          if (res.contentType && res.owner) {
            const loadedMediaAsset = await getMomentAsset({
              asset: res.asset,
              content: res.content,
              owner: res.owner,
            })
            setMedia(loadedMediaAsset)
          }
          setMoment(res)
          setIsSharedMoment(
            res.owner !== (await Auth.currentUserInfo()).username,
          )
        })
        .catch(err => history.replace('/moments'))
    }
  })

  const saveMoment = async () => {
    triggerUpdateReflection({ moment, media })
  }

  const deleteMoment = async (e: any) => {
    await removeMomentAPI({ moment, media })
    e.preventDefault()
    history.replace('/moments')
    setIsToast({
      present: true,
      color: 'success',
      message: `Moment erfolgreich gelöscht`,
    })
  }

  /*
    add the new user to the local-state
  */
  const addShare = (user: ShareUser) => {
    setMoment((moment: any) => {
      moment.sharedUsers = [...moment.sharedUsers, user.id]
      moment.sharedUsersDetail = [...moment.sharedUsersDetail, user]
      return { ...moment }
    })
  }

  /*
    remove the user from the local-state
  */
  const removeShare = (user: ShareUser) => {
    setMoment((moment: any) => {
      moment.sharedUsers = [
        ...moment.sharedUsers.filter((id: string) => id !== user.id),
      ]
      moment.sharedUsersDetail = [
        ...moment.sharedUsersDetail.filter(
          (userDetail: any) => userDetail.id !== user.id,
        ),
      ]
      return { ...moment }
    })
  }

  const updateURIAfterUpdateRelfectionIsFinished = () => {
    setTimeout(() => {
      history.replace('/moments')
    }, 500)
  }
  /*
    Inizialize the JSXLoader when updating the Reflection
  */
  const [JSXLoader, , triggerUpdateReflection] = useCustomLoaderOnTrigger({
    promise: saveMomentAPI,
    callback: updateURIAfterUpdateRelfectionIsFinished,
    loadingMessage: 'Moment wird gespeichert...',
    toastMessage: 'Moment erfolgreich gespeichert!',
  })

  return (
    <IonPage>
      {JSXLoader}
      <Header
        disabled={!Boolean(moment.id)}
        iconSlot={[
          match?.params?.id && (
            <IonButton
              onClick={() => {
                const currentIsFavorite = moment.isFavorite
                  ? moment.isFavorite
                  : false
                setMoment({ ...moment, isFavorite: !currentIsFavorite })
              }}
            >
              <IonIcon
                color="warning"
                slot="icon-only"
                icon={moment.isFavorite ? star : starOutline}
              />
            </IonButton>
          ),
          <ShareOverview
            id={match?.params?.id}
            sharedUsers={moment.sharedUsersDetail || []}
            assetType={'Moment'}
            shareAsset={addShare}
            removeAsset={removeShare}
          />,
        ]}
        deleteSlot={deleteMoment}
      >
        Moment {match?.params?.id ? 'speichern' : 'erstellen'}
      </Header>
      <IonContent fullscreen>
        <LargeHeader>
          Moment {match?.params?.id ? 'bearbeiten' : 'erstellen'}
        </LargeHeader>
        <DisplayMedia>{media}</DisplayMedia>

        <IonList>
          <IonItem>
            <IonInput
              value={moment.title}
              placeholder="Title"
              debounce={600}
              disabled={isSharedMoment}
              onIonChange={e =>
                setMoment((prevMoment: any) => ({
                  ...prevMoment,
                  title: e.detail.value,
                }))
              }
              clearInput
              required
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Tags</IonLabel>
            <IonSelect
              value={moment.tags}
              multiple={true}
              cancelText="Abbrechen"
              okText="Hinzufügen"
              disabled={isSharedMoment}
              onIonChange={e =>
                setMoment((prevMoment: any) => ({
                  ...prevMoment,
                  tags: e.detail.value,
                }))
              }
            >
              {/* TODO: neeed correct tags */}
              {momentTags.map(tag => (
                <IonSelectOption key={tag.value} value={tag.value}>
                  {tag.label}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <AudioRecorder
                setMedia={setMedia}
                disabled={isSharedMoment}
                style={{ height: 80 }}
              />
              <VideoRecorder
                setMedia={setMedia}
                disabled={isSharedMoment}
                style={{ height: 80 }}
              />
            </IonCol>
            <IonCol size="6">
              <ImageRecorder
                setMedia={setMedia}
                disabled={isSharedMoment}
                style={{ height: 80 }}
              />
              <TextRecorder
                setMedia={setMedia}
                media={media}
                disabled={isSharedMoment}
                style={{ height: 80 }}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonButton
        expand="block"
        onClick={() => saveMoment()}
        disabled={
          isSharedMoment || moment.title.length === 0 || media.type === ''
        }
      >
        <IonIcon
          slot="start"
          icon={match?.params?.id ? save : addCircle}
        ></IonIcon>
        Moment {match?.params?.id ? 'speichern' : 'erstellen'}
      </IonButton>
      <IonToast
        isOpen={isToast.present}
        onDidDismiss={() =>
          setIsToast(prevState => ({ ...isToast, present: !isToast.present }))
        }
        message={isToast.message}
        duration={2000}
        color={isToast.color}
      />
    </IonPage>
  )
}
