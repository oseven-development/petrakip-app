import React, { Dispatch, SetStateAction } from 'react'
import { Media } from '../../api/moment/saveMoment'
import { videocam } from 'ionicons/icons'
import { ImageAndVideoRecorder } from './imageAndVideoRecorder'

interface Props {
  setMedia: Dispatch<SetStateAction<Media>>
  disabled?: boolean
  buttonLabel?: string
  style?: { [key: string]: any }
}

const VideoRecorder: React.FC<Props> = ({
  setMedia,
  disabled = false,
  buttonLabel = 'Video aufnehmen',
  style,
}) => {
  return (
    <ImageAndVideoRecorder
      setMedia={setMedia}
      mediaType="video"
      captureIcon={videocam}
      disabled={disabled}
      buttonLabel={buttonLabel}
      style={style}
    ></ImageAndVideoRecorder>
  )
}

export { VideoRecorder }
