import { useState } from 'react'
import { useCamera } from '@ionic/react-hooks/camera'
import { CameraResultType, CameraSource } from '@capacitor/core'
import {
  MediaFile,
  VideoCapturePlusOptions,
  VideoCapturePlus,
} from '@ionic-native/video-capture-plus'
// TODO: ADD native modules
// https://ionicframework.com/docs/react/your-first-app/5-adding-mobile
// https://ionicframework.com/docs/react/your-first-app/2-taking-photos

// PWA-elements ref
// https://capacitorjs.com/docs/web/pwa-elements

export function useCameraPhoto() {
  const [photo, setPhoto] = useState({})
  const { getPhoto } = useCamera()

  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    })
    setPhoto({
      name: new Date().toISOString() + cameraPhoto.format,
      webviewPath: cameraPhoto.webPath,
    })
  }
  return {
    photo,
    takePhoto,
  }
}
// REF https://dev.to/aaronksaunders/how-to-record-videos-in-reactjs-with-capacitor-and-cordova-plugins-276g
// TODO: can only be used on a device.
export function useCameraVideo() {
  const [videoCapture, setVideoCapture] = useState({})

  const doVideoCapture = async () => {
    let options: VideoCapturePlusOptions = { limit: 1, duration: 30 }
    let capture: any = await VideoCapturePlus.captureVideo(options)
    setVideoCapture((capture[0] as MediaFile).fullPath)
    console.log(videoCapture)
  }
  return {
    videoCapture,
    doVideoCapture,
  }
}
