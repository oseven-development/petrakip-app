import { useState, useEffect } from 'react'
import { usePlatform } from './usePlatform'

export const useWebMediaRecorder = () => {
  const platform = usePlatform()
  console.log(platform)
  const [audioURL, setAudioURL] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recorder, setRecorder]: any = useState(null)

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error)
      }
      return
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start()
    } else {
      recorder.stop()
    }

    // Obtain the audio when ready.
    const handleData = (e: any) => {
      setAudioURL(URL.createObjectURL(e.data))
    }
    recorder.addEventListener('dataavailable', handleData)
    return () => recorder.removeEventListener('dataavailable', handleData)
  }, [recorder, isRecording])

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return [audioURL, isRecording, toggleRecording]
}

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  return new MediaRecorder(stream)
}
