import React, { Dispatch, SetStateAction } from 'react'
import { Media } from '../../api/moment/saveMoment'
import { camera } from 'ionicons/icons'
import { ImageAndVideoRecorder } from './imageAndVideoRecorder'

interface Props {
  setMedia: Dispatch<SetStateAction<Media>>
  disabled?: boolean
  buttonLabel?: string
  style?: { [key: string]: any }
}

const ImageRecorder: React.FC<Props> = ({
  setMedia,
  disabled = false,
  buttonLabel = 'Foto aufnehmen',
  style,
}) => {
  return (
    <ImageAndVideoRecorder
      setMedia={setMedia}
      mediaType="image"
      captureIcon={camera}
      disabled={disabled}
      buttonLabel={buttonLabel}
      style={style}
    ></ImageAndVideoRecorder>
  )
}

export { ImageRecorder }
