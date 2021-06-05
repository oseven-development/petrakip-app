import {
  IonContent,
  IonPage,
  IonImg,
  IonItem,
  IonInput,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonTextarea,
  IonToast,
  useIonViewWillEnter,
} from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AudioRecorder } from '../../components/media/audioRecorder'
import { VideoRecorder } from '../../components/media/videoRecorder'
import { ImageRecorder } from '../../components/media/imageRecorder'
import { LargeHeader, Header } from '../../components/header'
import { TextRecorder } from '../../components/media/TextRecorder'
import { createMomentAPI, Media } from '../../api/moment/createMoment'
import { getContentTypeFromMimeType } from '../../utils/getContentTypeUtils'
import { getMomentAPI } from '../../api/moment/getMoment'
import { getMomentAsset } from '../../api/moment/getMomentAsset'

export interface Moment {
  title: string
  tags: string[]
}
interface Props extends RouteComponentProps<{}> {
  id: string
}

export const MomentsDetailView: React.FC<Props> = props => {
  const { match }: any = props
  const [isToastPresent, setIsToastPresent] = useState(false)
  const [media, setMedia] = useState<Media>({
    type: '',
    data: '',
    name: '',
  })
  const [moment, setMoment] = useState<any>({ title: '', tags: [''] })

  useEffect(() => {
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
    // can't add as dependency will cause error in ionic
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createNewMoment = () => {
    if (moment.title.length === 0) {
      setIsToastPresent(true)
    } else {
      createMomentAPI({ moment, media })
    }
  }

  return (
    <IonPage>
      <Header>Moment Erstellen</Header>
      <IonContent fullscreen>
        <LargeHeader>Moment Erstellen</LargeHeader>
        <div
          className="ion-margin"
          style={{
            height: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {getContentTypeFromMimeType(media.type) === 'audio' && (
            <audio src={URL.createObjectURL(media.data)} controls />
          )}
          {getContentTypeFromMimeType(media.type) === 'video' && (
            <video
              style={{ height: 200 }}
              src={URL.createObjectURL(media.data)}
              controls
            />
          )}
          {getContentTypeFromMimeType(media.type) === 'image' && (
            <IonImg
              style={{ height: 200 }}
              src={URL.createObjectURL(media.data)}
              alt="test"
            />
          )}
          {getContentTypeFromMimeType(media.type) === 'text' && (
            <IonTextarea disabled readonly value={media.data}></IonTextarea>
          )}
          {getContentTypeFromMimeType(media.type) === undefined && (
            <IonImg
              style={{ height: 200 }}
              src={`assets/placeholder.jpeg`}
              alt="test"
            />
          )}
        </div>

        <IonList>
          <IonItem>
            <IonInput
              value={moment.title}
              placeholder="Title"
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
      <IonButton expand="full" onClick={createNewMoment}>
        Moment erstellen
      </IonButton>
      <IonToast
        isOpen={isToastPresent}
        onDidDismiss={() => setIsToastPresent(!isToastPresent)}
        message="Du hast keinen Titel für den Moment definiert"
        duration={2000}
        color={'danger'}
      />
    </IonPage>
  )
}
