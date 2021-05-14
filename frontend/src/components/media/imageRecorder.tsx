import { IonButton, IonText } from '@ionic/react'
import React, { useRef } from 'react'

import { usePlatform } from '../../hooks/usePlatform'

interface Props {
  setMedia: React.Dispatch<React.SetStateAction<any>>
}

const ImageRecorder: React.FC<Props> = ({ setMedia }) => {
  const platform = usePlatform()
  const fileInput = useRef(null)

  const onSelectFile = (e: any) => {
    const data =
      (e.nativeEvent.target as HTMLInputElement).files?.item(0) || ({} as File)
    console.log(data)
    setMedia({ data: URL.createObjectURL(data), type: data.type })
  }

  return platform === 'ios' ? (
    <div>not implemented</div>
  ) : (
    <React.Fragment>
      <>
        <input
          ref={fileInput}
          hidden
          type="file"
          accept="image/*"
          capture="camcorder"
          onChange={onSelectFile}
          onClick={() => {
            console.log('onClick')
          }}
        />
        <IonButton
          color="primary"
          onClick={() => {
            // @ts-ignore
            fileInput?.current?.click()
          }}
        >
          Foto aufnehmen
        </IonButton>
      </>
    </React.Fragment>
  )
}

export { ImageRecorder }
