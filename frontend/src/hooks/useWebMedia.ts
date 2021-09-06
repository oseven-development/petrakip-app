import {
  GenericResponse,
  RecordingData,
  VoiceRecorder,
} from 'capacitor-voice-recorder'
import { extension } from 'mime-types'
import { useState, useEffect } from 'react'
import { Media } from '../api/moment/saveMoment'
import { Platform } from './usePlatform'

export const useVoiceMediaRecorder = (
  platform: Platform,
): [Media, boolean, Function] => {
  const [audioURL, setAudioURL] = useState<Media>({
    name: '',
    data: '',
    type: '',
  })
  const [isRecording, setIsRecording] = useState(false)
  const [recorder, setRecorder] = useState<MediaRecorder | undefined>(undefined)

  // effect for not-ios
  useEffect(() => {
    if (platform !== Platform.ios) {
      // Lazily obtain recorder first time we're recording.
      if (!recorder) {
        if (isRecording) {
          requestRecorder().then(setRecorder).catch(console.error)
        }
        return
      }

      // Manage recorder state.
      if (isRecording) {
        recorder?.start()
      } else {
        recorder?.stop()
      }

      // Obtain the audio when ready.
      // TODO: Add Type later
      const handleData = (e: BlobEvent) => {
        setAudioURL({
          name: `audio-${new Date().toISOString()}.${extension(e.data.type)}`,
          data: e.data,
          type: e.data.type,
        })
      }
      recorder?.addEventListener('dataavailable', handleData)
      return () => recorder?.removeEventListener('dataavailable', handleData)
    }
  }, [recorder, isRecording, platform])

  // effect for ios
  useEffect(() => {
    if (platform === Platform.ios) {
      const runFunction = async () => {
        const hasPermission = await VoiceRecorder.requestAudioRecordingPermission()

        if (hasPermission) {
          if (isRecording) {
            VoiceRecorder.startRecording()
              .then((result: GenericResponse) => console.log(result.value))
              .catch(error => console.log(error))
          } else {
            VoiceRecorder.stopRecording()
              .then(async (result: RecordingData) => {
                const base64Response = await fetch(
                  `data:${result.value.mimeType};base64,${result.value.recordDataBase64}`,
                )
                const blob = await base64Response.blob()
                setAudioURL({
                  name: `audio-${new Date().toISOString()}.${extension(
                    result.value.mimeType,
                  )}`,
                  data: blob,
                  type: result.value.mimeType,
                })
              })
              .catch(error => console.log(error))
          }
        }
      }
      runFunction()
    }
  }, [platform, isRecording])

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return [audioURL, isRecording, toggleRecording]
}

async function requestRecorder() {
  const audioOptions = { audio: true, video: false }
  const stream = await navigator.mediaDevices.getUserMedia(audioOptions)
  return new MediaRecorder(stream)
}
