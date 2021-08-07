import { IonButton, IonIcon } from '@ionic/react'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import { Media } from '../../api/moment/saveMoment'
import { camera } from 'ionicons/icons'

import { usePlatform } from '../../hooks/usePlatform'

interface Props {
  setMedia: Dispatch<SetStateAction<Media>>
  disabled?: boolean
  buttonLabel?: string
}

const ImageRecorder: React.FC<Props> = ({
  setMedia,
  disabled = false,
  buttonLabel = 'Foto aufnehmen',
}) => {
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
        accept="image/*"
        capture="camcorder"
        onChange={onSelectFile}
        disabled={disabled}
      />
      <IonButton
        disabled={disabled}
        color="primary"
        expand="block"
        onClick={() => {
          // @ts-ignore
          fileInput?.current?.click()
        }}
      >
        <IonIcon icon={camera} size="small" style={{ paddingRight: 4 }} />
        {buttonLabel}
      </IonButton>
    </>
  )
}

export { ImageRecorder }
