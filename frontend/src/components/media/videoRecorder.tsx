import { IonButton, IonIcon } from '@ionic/react'
import { videocam } from 'ionicons/icons'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import { Media } from '../../api/moment/saveMoment'

import { usePlatform } from '../../hooks/usePlatform'

interface Props {
  setMedia: Dispatch<SetStateAction<Media>>
  disabled: boolean
  style?: any
}

const VideoRecorder: React.FC<Props> = ({ setMedia, disabled, style }) => {
  const platform = usePlatform()
  const fileInput = useRef(null)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data =
      (e.nativeEvent.target as HTMLInputElement).files?.item(0) || ({} as File)
    setMedia({
      name: data.name,
      data: data,
      type: data.type,
    })
  }

  return platform === 'not defined' ? (
    <div>not implemented</div>
  ) : (
    <>
      <input
        ref={fileInput}
        hidden
        type="file"
        accept="video/*"
        capture="camcorder"
        onChange={onSelectFile}
        disabled={disabled}
      />
      <IonButton
        color="primary"
        expand="block"
        disabled={disabled}
        style={{ whiteSpace: 'break-spaces', ...style }}
        onClick={() => {
          // @ts-ignore
          fileInput?.current?.click()
        }}
      >
        <IonIcon slot="start" icon={videocam} size="medium" />
        Video aufnehmen
      </IonButton>
    </>
  )
}

export { VideoRecorder }
