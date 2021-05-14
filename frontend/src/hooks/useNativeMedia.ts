import { useState } from 'react'

import {
  MediaCapture,
  MediaFile,
  CaptureVideoOptions,
  CaptureImageOptions,
  CaptureAudioOptions,
} from '@ionic-native/media-capture'

export function usePhoto() {
  const [photoCapture, setPhotoCapture] = useState({})

  const doPhotoCapture = async () => {
    const options: CaptureImageOptions = { limit: 1 }
    const capture: any = await MediaCapture.captureImage(options)
    console.log(capture)

    setPhotoCapture((capture[0] as MediaFile).fullPath)
  }
  return {
    photoCapture,
    doPhotoCapture,
  }
}
// REF https://stackoverflow.com/questions/61373241/react-ionic-video-recording
// TODO: can only be used on a device.

export function useVideo() {
  const [videoCapture, setVideoCapture] = useState({})

  const doVideoCapture = async () => {
    const options: CaptureVideoOptions = { limit: 1, duration: 30 }
    const capture: any = await MediaCapture.captureVideo(options)
    console.log(videoCapture)
    setVideoCapture((capture[0] as MediaFile).fullPath)
  }
  return {
    videoCapture,
    doVideoCapture,
  }
}

export function useAudio() {
  const [audioCapture, setAudioCapture] = useState({})

  const doAudioCapture = async () => {
    const options: CaptureAudioOptions = { limit: 1, duration: 30 }
    const capture: any = await MediaCapture.captureAudio(options)
    console.log(audioCapture)

    setAudioCapture((capture[0] as MediaFile).fullPath)
  }
  return {
    audioCapture,
    doAudioCapture,
  }
}
