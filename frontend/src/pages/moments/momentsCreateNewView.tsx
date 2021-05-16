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
  IonFooter,
  IonItemDivider,
  IonTextarea,
} from '@ionic/react'
import { Header } from '../../components'
import { RouteComponentProps } from 'react-router'
import { useState } from 'react'
import { AudioRecorder } from '../../components/media/audioRecorder'
import { VideoRecorder } from '../../components/media/videoRecorder'
import { ImageRecorder } from '../../components/media/imageRecorder'
import { LargeHeader } from '../../components/header'
import { ModalExample } from '../../components/media/textArea'
interface Props extends RouteComponentProps<{}> {}

export const MomentsCreateNewView: React.FC<Props> = ({ match, history }) => {
  const [media, setMedia]: any = useState(null)
  const [text, setText]: any = useState(null)
  const [tags, setTags]: any = useState(null)

  console.log(media)

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
          {media?.type?.includes('audio') ? (
            <audio src={media.data} controls />
          ) : media?.type?.includes('video') ? (
            <video style={{ height: 200 }} src={media.data} controls />
          ) : media?.type?.includes('image') ? (
            <IonImg style={{ height: 200 }} src={media.data} alt="test" />
          ) : media?.type?.includes('text') ? (
            <IonTextarea disabled readonly value={media.data}></IonTextarea>
          ) : (
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
              value={text}
              placeholder="Title"
              onIonChange={e => setText(e.detail.value!)}
              clearInput
              required
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Tags</IonLabel>
            <IonSelect
              value={tags}
              multiple={true}
              cancelText="Abbrechem"
              okText="Hinzufügen"
              onIonChange={e => setTags(e.detail.value)}
            >
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

        <ModalExample setMedia={setMedia} />
      </IonContent>
      <IonButton expand="full">Moment erstellen</IonButton>
    </IonPage>
  )
}
