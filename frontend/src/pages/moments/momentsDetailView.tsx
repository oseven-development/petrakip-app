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
import {
  SharedUserInformation,
  shareMomentAPI,
} from '../../api/moment/shareMoment'
import { ShareOverview } from '../../components/share/shareOverview'
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

  useIonViewWillEnter(() => {
    if (match?.params?.id) {
      getMomentAPI({ id: match?.params?.id }).then(async res => {
        const loadedMediaAsset = await getMomentAsset(
          res.asset?.key,
          res.contentType,
          res.content,
        )
        setMedia(loadedMediaAsset)
        setMoment(res)
      })
    }
  })

  const saveMoment = async () => {
    if (moment.title.length === 0 || media.type === '') {
      setIsToast({
        ...isToast,
        present: true,
        message: `Moment konnte nicht erstellt werden. Jeder Titel nicht definiert oder Medientyp`,
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
    }
  }
  const shareMoment = async () => {
    const sharedUserInformation: SharedUserInformation = {
      email: 'test@mail.de',
    }
    await shareMomentAPI({ moment, sharedUserInformation })
    setIsToast({
      present: true,
      color: 'success',
      message: `Moment erfolgreich mit ID ${match?.params?.id} geteilt`,
    })
  }
  const deleteMoment = async (e: any) => {
    await removeMomentAPI({ moment, media })
    console.log(moment)
    e.preventDefault()
    history.push('/moments')
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
            sharedUsers={['Max', 'Stefan', 'Philipp']}
            assetType={'Moment'}
            shareAsset={(user: any) => {
              console.log(`Für ${user} freigeben`)
            }}
            removeAsset={(user: any) => {
              console.log(`Freigabe beendet für ${user}`)
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
              cancelText="Abbrechem"
              okText="Hinzufügen"
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

        <AudioRecorder setMedia={setMedia} />

        <VideoRecorder setMedia={setMedia} />

        <ImageRecorder setMedia={setMedia} />

        <TextRecorder setMedia={setMedia} />
      </IonContent>
      <IonButton expand="full" onClick={saveMoment}>
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
