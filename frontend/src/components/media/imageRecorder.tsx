import {
  IonActionSheet,
  IonButton,
  IonButtons,
  IonIcon,
  IonImg,
} from '@ionic/react'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import { Media } from '../../api/moment/saveMoment'
import { camera } from 'ionicons/icons'

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera'

import {
  trash,
  share,
  caretForwardCircle,
  heart,
  close,
  image,
  addCircle,
} from 'ionicons/icons'

import { usePlatform } from '../../hooks/usePlatform'
import { usePhoto } from '../../hooks/useNativeMedia'

interface Props {
  setMedia: Dispatch<SetStateAction<Media>>
  disabled?: boolean
  buttonLabel?: string
  style?: any
}

// export function usePhotoGallery() {
//   const takePhoto = async () => {
//     const cameraPhoto = await Camera.getPhoto({
//       resultType: CameraResultType.Uri,
//       source: CameraSource.Camera,
//       quality: 100,
//     })
//   }

//   return {
//     takePhoto,
//   }
// }

const ImageRecorder: React.FC<Props> = ({
  setMedia,
  disabled = false,
  buttonLabel = 'Foto aufnehmen',
  style,
}) => {
  const platform = usePlatform()
  const fileInput = useRef(null)

  const [showActionSheet, setShowActionSheet] = React.useState(false)

  // const { takePhoto } = usePhotoGallery()

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data =
      (e.nativeEvent.target as HTMLInputElement).files?.item(0) || ({} as File)
    setMedia({
      name: data.name,
      data: data,
      type: data.type,
    })
  }

  const Web = () => (
    <>
      <input
        ref={fileInput}
        hidden
        type="file"
        accept="image/*"
        // capture="camcorder"
        onChange={onSelectFile}
        disabled={disabled}
      />
      <IonButton
        disabled={disabled}
        color="primary"
        expand="block"
        style={{ whiteSpace: 'break-spaces', ...style }}
        onClick={() => {
          // @ts-ignore
          fileInput?.current?.click()
        }}
      >
        <IonIcon slot="start" icon={camera} size="medium" />
        {buttonLabel}
      </IonButton>
    </>
  )

  const { doPhotoCapture, photoCapture } = usePhoto()

  const take = async () => {
    await doPhotoCapture()
    // try {
    //   await doPhotoCapture()
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const actionSheet = () => (
    <>
      <IonButton onClick={() => setShowActionSheet(true)} expand="block">
        Show Action Sheet
      </IonButton>
      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        cssClass="my-custom-class"
        buttons={[
          {
            text: 'Foto auswählen',
            icon: image,
            handler: () => {
              console.log('Delete clicked')
            },
          },
          {
            text: 'Neues Foto erstellen',
            icon: addCircle,
            handler: () => {
              console.log('Share clicked')
            },
          },
          {
            text: 'Cancel',
            icon: close,
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked')
            },
          },
        ]}
      ></IonActionSheet>
    </>
  )

  const nativeOrNot = {
    // 'ios': (
    //   <>
    //     {actionSheet()}
    //     {'asdadasd'}
    //     {/* <IonButton onClick={take}>Foto 2</IonButton> */}
    //     {/* <p>{photoCapture}</p> */}
    //     {/* <p>{Capacitor.convertFileSrc(photoCapture)}</p> */}
    //     <IonImg src={photoCapture}></IonImg>
    //   </>
    // ),
    'android': <>Andriod</>,
    'ios': Web(),
    'web': Web(),
    'not defined': <div>not implemented</div>,
  }

  return nativeOrNot[platform]
}

export { ImageRecorder }
