import { IonButton, IonIcon } from '@ionic/react'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import { Media } from '../../api/moment/saveMoment'
import { camera } from 'ionicons/icons'

interface Props {
  setMedia: Dispatch<SetStateAction<Media>>
  disabled?: boolean
  buttonLabel?: string
  style?: any
}

const ImageRecorder: React.FC<Props> = ({
  setMedia,
  disabled = false,
  buttonLabel = 'Foto aufnehmen',
  style,
}) => {
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

  return (
    <>
      <input
        ref={fileInput}
        hidden
        type="file"
        accept="image/*"
        // capture="camcorder"
        onChange={onSelectFile}
        disabled={disabled}
      />
      <IonButton
        disabled={disabled}
        color="primary"
        expand="block"
        style={{ whiteSpace: 'break-spaces', ...style }}
        onClick={() => {
          // @ts-ignore
          fileInput?.current?.click()
        }}
      >
        <IonIcon slot="start" icon={camera} size="medium" />
        {buttonLabel}
      </IonButton>
    </>
  )
}

export { ImageRecorder }
