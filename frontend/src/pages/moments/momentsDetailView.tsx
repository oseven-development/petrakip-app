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
import { RouteComponentProps } from 'react-router'
import { useState } from 'react'
import { AudioRecorder } from '../../components/media/audioRecorder'
import { VideoRecorder } from '../../components/media/videoRecorder'
import { ImageRecorder } from '../../components/media/imageRecorder'
import { LargeHeader, Header } from '../../components/header'
import { TextRecorder } from '../../components/media/TextRecorder'
import { saveMomentAPI, Media } from '../../api/moment/saveMoment'
import { getMomentAPI } from '../../api/moment/getMoment'
import { getMomentAsset } from '../../api/moment/getMomentAsset'
import { DisplayMedia } from '../../components/media/displayMedia'
import { removeMomentAPI } from '../../api/moment/deleteMoment'

import { ShareOverview } from '../../components/share/shareOverview'
import { Auth } from 'aws-amplify'
import React from 'react'
import { ShareUser } from '../../types/shareUser'
import { momentTags } from '../../data/momentTags'
import { addCircle, save, star, starOutline } from 'ionicons/icons'
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
  const [moment, setMoment]: any = useState<any>({ title: '', tags: [''] })
  const [isSharedMoment, setIsSharedMoment] = useState<boolean>(false)

  useIonViewWillEnter(() => {
    if (match?.params?.id) {
      getMomentAPI({ id: match?.params?.id })
        .then(async res => {
          // Graphql returns a success query with null
          if (res) {
            const loadedMediaAsset = await getMomentAsset({
              asset: res.asset,
              contentType: res.contentType,
              content: res.content,
              owner: res.owner,
            })
            setMedia(loadedMediaAsset)
            setMoment(res)
            setIsSharedMoment(
              res.owner !== (await Auth.currentUserInfo()).username,
            )
          } else {
            history.replace('/moments')
          }
        })
        .catch(err => history.replace('/moments'))
    }
  })

  const saveMoment = async () => {
    if (moment.title.length === 0 || media.type === '') {
      setIsToast({
        ...isToast,
        present: true,
        message: `Moment konnte nicht erstellt werden. Entweder Titel oder Medium nicht definiert`,
      })
    } else {
      await saveMomentAPI({ moment, media })
      setIsToast({
        present: true,
        color: 'success',
        message: `Moment erfolgreich ${
          match?.params?.id ? 'geändert' : 'erstellt'
        }`,
      })

      history.replace('/moments')
    }
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

  return (
    <IonPage>
      <Header
        shareSlot={
          <>
            {match?.params?.id && (
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
            )}

            <ShareOverview
              id={match?.params?.id}
              sharedUsers={moment.sharedUsersDetail || []}
              assetType={'Moment'}
              shareAsset={addShare}
              removeAsset={removeShare}
            />
          </>
        }
        deleteSlot={deleteMoment}
      >
        Moment {match?.params?.id ? 'ändern' : 'erstellen'}
      </Header>
      <IonContent fullscreen>
        <LargeHeader>
          Moment {match?.params?.id ? 'ändern' : 'erstellen'}
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
              {momentTags.map((tag: any) => (
                <IonSelectOption value={tag.value}>{tag.label}</IonSelectOption>
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
        disabled={isSharedMoment}
      >
        <IonIcon
          slot="start"
          icon={match?.params?.id ? save : addCircle}
        ></IonIcon>
        Moment {match?.params?.id ? 'ändern' : 'erstellen'}
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
