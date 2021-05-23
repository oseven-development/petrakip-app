import { useState, useEffect } from 'react'

export const audioOptions = { audio: true, video: false }
export const videoOptions = { audio: true, video: true }
export const photoOptions = { audio: true, video: false }

export const useWebMediaRecorder = (options: any) => {
  const [audioURL, setAudioURL] = useState({})
  const [isRecording, setIsRecording] = useState(false)
  const [recorder, setRecorder]: any = useState(null)

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder(options).then(setRecorder, console.error)
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
      setAudioURL({
        name: e.data.name,
        data: e.data,
        type: e.data.type,
      })
    }
    recorder.addEventListener('dataavailable', handleData)
    return () => recorder.removeEventListener('dataavailable', handleData)
  }, [recorder, isRecording, options])

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return [audioURL, isRecording, toggleRecording]
}

async function requestRecorder(options: any) {
  const stream = await navigator.mediaDevices.getUserMedia(options)
  return new MediaRecorder(stream)
}
