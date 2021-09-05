import { extension } from 'mime-types'
import { useState, useEffect } from 'react'
import { Media } from '../api/moment/saveMoment'

interface MediaOptions {
  audio: boolean
  video: boolean
}

export const audioOptions = { audio: true, video: false }
export const videoOptions = { audio: true, video: true }
export const photoOptions = { audio: true, video: false }

export const useWebMediaRecorder = (
  options: MediaOptions,
): [Media, boolean, Function] => {
  const [audioURL, setAudioURL] = useState<Media>({
    name: '',
    data: '',
    type: '',
  })
  const [isRecording, setIsRecording] = useState(false)
  const [recorder, setRecorder] = useState<MediaRecorder | undefined>(undefined)

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (!recorder) {
      if (isRecording) {
        requestRecorder(options).then(setRecorder).catch(console.error)
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
  }, [recorder, isRecording, options])

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return [audioURL, isRecording, toggleRecording]
}

async function requestRecorder(options: MediaOptions) {
  const stream = await navigator.mediaDevices.getUserMedia(options)
  return new MediaRecorder(stream)
}
