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
} from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { Dispatch, SetStateAction, useState } from 'react'
import { AudioRecorder } from '../../components/media/audioRecorder'
import { VideoRecorder } from '../../components/media/videoRecorder'
import { ImageRecorder } from '../../components/media/imageRecorder'
import { LargeHeader, Header } from '../../components/header'
import { TextRecorder } from '../../components/media/TextRecorder'
import {
  createMomentAPI,
  getContentType,
  Media,
} from '../../api/moment/createMoment'

export interface Moment {
  title: string
  tags: string[]
}
interface Props extends RouteComponentProps<{}> {}

export const MomentsCreateNewView: React.FC<Props> = ({ match, history }) => {
  const [isToastPresent, setIsToastPresent] = useState(false)
  const [media, setMedia] = useState<Media>({
    type: '',
    data: '',
    name: '',
  })
  const [moment, setMoment] = useState<Moment>({
    title: '',
    tags: [''],
  })

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
          {getContentType(media.type) === 'audio' && (
            <audio src={URL.createObjectURL(media.data)} controls />
          )}
          {getContentType(media.type) === 'video' && (
            <video
              style={{ height: 200 }}
              src={URL.createObjectURL(media.data)}
              controls
            />
          )}
          {getContentType(media.type) === 'video' && (
            <IonImg
              style={{ height: 200 }}
              src={URL.createObjectURL(media.data)}
              alt="test"
            />
          )}
          {getContentType(media.type) === 'text' && (
            <IonTextarea disabled readonly value={media.data}></IonTextarea>
          )}
          {getContentType(media.type) === undefined && (
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
                setMoment({ ...moment, title: e.detail.value! })
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
              onIonChange={e => {
                setMoment({ ...moment, tags: e.detail.value! })
              }}
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
