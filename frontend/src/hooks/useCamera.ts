import { useState } from 'react'
import { useCamera } from '@ionic/react-hooks/camera'
import { CameraResultType, CameraSource } from '@capacitor/core'

// TODO: ADD native modules
// https://ionicframework.com/docs/react/your-first-app/5-adding-mobile
// https://ionicframework.com/docs/react/your-first-app/2-taking-photos

// PWA-elements ref
// https://capacitorjs.com/docs/web/pwa-elements

export function useCameraHook() {
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
