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
import { shareMomentAPI, ShareType } from '../../api/moment/shareMoment'
import { ShareOverview } from '../../components/share/shareOverview'
import { Auth } from 'aws-amplify'
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
  const [moment, setMoment] = useState<any>({ title: '', tags: [''] })
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
  const shareMoment = async (email: string, shareType: ShareType) => {
    await shareMomentAPI({
      moment,
      sharedUserInformation: { email },
      shareType: shareType,
    })
    setIsToast({
      present: true,
      color: 'success',
      message: `Moment erfolgreich mit ID ${match?.params?.id} ${
        shareType === 'share' ? ' geteilt' : 'nicht mehr geteilt'
      }`,
    })
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

  return (
    <IonPage>
      <Header
        shareSlot={
          <ShareOverview
            sharedUsers={moment.sharedUsers || []}
            assetType={'Moment'}
            shareAsset={(user: any) => {
              shareMoment(user, 'share')
            }}
            removeAsset={(user: any) => {
              shareMoment(user, 'remove')
            }}
          />
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
              <IonSelectOption value="bacon">Bacon</IonSelectOption>
              <IonSelectOption value="olives">Black Olives</IonSelectOption>
              <IonSelectOption value="xcheese">Extra Cheese</IonSelectOption>
              <IonSelectOption value="peppers">Green Peppers</IonSelectOption>
              <IonSelectOption value="mushrooms">Mushrooms</IonSelectOption>
              <IonSelectOption value="onions">Onions</IonSelectOption>
              <IonSelectOption value="pepperoni">Pepperoni</IonSelectOption>
              <IonSelectOption value="pineapple">Pineapple</IonSelectOption>
              <IonSelectOption value="sausage">Sausage</IonSelectOption>
              <IonSelectOption value="Spinach">Spinach</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>

        <AudioRecorder setMedia={setMedia} disabled={isSharedMoment} />

        <VideoRecorder setMedia={setMedia} disabled={isSharedMoment} />

        <ImageRecorder setMedia={setMedia} disabled={isSharedMoment} />

        <TextRecorder setMedia={setMedia} disabled={isSharedMoment} />
      </IonContent>
      <IonButton expand="full" onClick={saveMoment} disabled={isSharedMoment}>
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
