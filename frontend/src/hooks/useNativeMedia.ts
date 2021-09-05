import { useState } from 'react'

import {
  MediaCapture,
  MediaFile,
  CaptureVideoOptions,
  CaptureImageOptions,
  CaptureAudioOptions,
} from '@ionic-native/media-capture'
import { Capacitor } from '@capacitor/core'

import { Camera, CameraOptions } from '@ionic-native/camera'

export function usePhoto() {
  const [photoCapture, setPhotoCapture] = useState<string>('')

  const cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: Camera.DestinationType.DATA_URL,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    allowEdit: true,
  }

  const doPhotoCapture = async () => {
    // const options: CaptureImageOptions = { limit: 1 }
    // const capture = await MediaCapture.captureImage(options)
    // console.log(capture)
    // if (Array.isArray(capture)) {
    // Capacitor.convertFileSrc
    //   setPhotoCapture(capture[0].fullPath)
    //   console.log(capture[0].fullPath)
    // } else {
    //   setPhotoCapture('ERROR')
    // }

    const gelleryOptions: CameraOptions = {
      quality: 100,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      allowEdit: true,
    }

    Camera.getPicture(cameraOptions).then(
      imgData => {
        console.log('image data =>  ', imgData)
        setPhotoCapture(`data:image/jpeg;base64,${imgData}`)
      },
      err => {
        console.log(err)
      },
    )
  }
  return {
    photoCapture,
    doPhotoCapture,
  }
}
// REF https://stackoverflow.com/questions/61373241/react-ionic-video-recording
// TODO: can only be used on a device.
// WIP: This hook is in work in progress

export function useVideo() {
  const [videoCapture, setVideoCapture] = useState({})

  const doVideoCapture = async () => {
    const options: CaptureVideoOptions = { limit: 1, duration: 30 }
    // @TODO: Fix any
    const capture: any = await MediaCapture.captureVideo(options)
    setVideoCapture((capture[0] as MediaFile).fullPath)
  }
  return {
    videoCapture,
    doVideoCapture,
  }
}

export function useAudio() {
  const [audioCapture, setAudioCapture] = useState('')

  const doAudioCapture = async () => {
    const options: CaptureAudioOptions = { limit: 1, duration: 30 }
    // @TODO: Fix any
    const capture = await MediaCapture.captureAudio(options)

    if (Array.isArray(capture)) {
      setAudioCapture(Capacitor.convertFileSrc(capture[0].fullPath))
    }
  }
  return {
    audioCapture,
    doAudioCapture,
  }
}
