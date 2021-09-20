import {
  IonButton,
  IonIcon,
  IonItem,
  IonList,
  useIonPopover,
} from '@ionic/react'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import { Media } from '../../api/moment/saveMoment'
import { image } from 'ionicons/icons'
import { usePlatform } from '../../hooks'
import { Platform } from '../../hooks/usePlatform'

interface Props {
  setMedia: Dispatch<SetStateAction<Media>>
  mediaType: 'video' | 'image'
  captureIcon: string
  disabled?: boolean
  buttonLabel: string
  style?: { [key: string]: any }
}

const ImageAndVideoRecorder: React.FC<Props> = ({
  setMedia,
  mediaType,
  captureIcon,
  disabled = false,
  buttonLabel,
  style,
}) => {
  const platform = usePlatform()

  const fileInput = useRef() as React.MutableRefObject<HTMLInputElement>
  const fileInputAndroidCamera = useRef() as React.MutableRefObject<HTMLInputElement>
  const fileInputAndroidGallery = useRef() as React.MutableRefObject<HTMLInputElement>

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data =
      (e.nativeEvent.target as HTMLInputElement).files?.item(0) || ({} as File)
    setMedia({
      name: data.name,
      data: data,
      type: data.type,
    })
  }

  const WebAndIosButton = (
    <>
      <IonButton
        disabled={disabled}
        color="primary"
        expand="block"
        style={{ whiteSpace: 'break-spaces', ...style }}
        onClick={() => {
          fileInput?.current?.click()
        }}
      >
        <input
          ref={fileInput}
          hidden
          type="file"
          accept={`${mediaType}/*`}
          onChange={onSelectFile}
          disabled={disabled}
        />
        <IonIcon slot="start" icon={captureIcon} size="medium" />
        {buttonLabel}
      </IonButton>
    </>
  )

  const androidPopoverListItems = [
    {
      ref: fileInputAndroidCamera,
      capture: 'camera',
      lable: 'Kamera',
      icon: captureIcon,
    },
    {
      ref: fileInputAndroidGallery,
      capture: undefined,
      lable: 'Galerie',
      icon: image,
    },
  ]

  const AndroidPopoverList: React.FC<{ onHide: () => void }> = ({ onHide }) => (
    <IonList>
      {androidPopoverListItems.map(({ lable, ref, capture, icon }) => (
        <IonItem
          lines="none"
          key={lable}
          button
          onClick={() => {
            ref?.current?.click()
            onHide()
          }}
        >
          <input
            ref={ref}
            hidden
            type="file"
            accept={`${mediaType}/*`}
            capture={capture}
            onChange={onSelectFile}
            disabled={disabled}
          />
          <IonIcon slot="start" icon={icon} size="medium" />
          {lable}
        </IonItem>
      ))}
    </IonList>
  )

  const [present, dismiss] = useIonPopover(AndroidPopoverList, {
    onHide: () => dismiss(),
  })

  const AndroidButton = (
    <IonButton
      disabled={disabled}
      style={{ whiteSpace: 'break-spaces', ...style }}
      expand="block"
      onClick={e => present({ event: e.nativeEvent })}
    >
      <IonIcon slot="start" icon={captureIcon} size="medium" />
      {buttonLabel}
    </IonButton>
  )

  const inputAccordingToPlatform = {
    [Platform.ios]: WebAndIosButton,
    [Platform.web]: WebAndIosButton,
    [Platform.android]: AndroidButton,
    [Platform.notDefined]: <>Nicht Implementiert</>,
  }

  return <>{inputAccordingToPlatform[platform]}</>
}

export { ImageAndVideoRecorder }
