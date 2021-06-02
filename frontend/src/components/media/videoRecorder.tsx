import { IonButton } from '@ionic/react'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import { Media } from '../../api/moment/createMoment'

import { usePlatform } from '../../hooks/usePlatform'

interface Props {
  setMedia: Dispatch<SetStateAction<Media>>
}

const VideoRecorder: React.FC<Props> = ({ setMedia }) => {
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

  return platform === 'xx' ? (
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
      />
      <IonButton
        color="primary"
        expand="full"
        onClick={() => {
          // @ts-ignore
          fileInput?.current?.click()
        }}
      >
        Video aufnehmen
      </IonButton>
    </>
  )
}

export { VideoRecorder }