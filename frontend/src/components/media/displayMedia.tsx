import React from 'react'
import { Media } from '../../api/moment/saveMoment'
import { getContentTypeFromMimeType } from '../../utils/getContentTypeUtils'
import { IonImg, IonSpinner, IonTextarea } from '@ionic/react'
import { useLocation } from 'react-router'

interface Props {
  children: Media
}
export const DisplayMedia: React.FC<Props> = ({ children }) => {
  const hasParameter =
    useLocation().pathname.split('/')[-1] === 'details' ? false : true
  return (
    <div
      className="ion-margin"
      style={{
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {getContentTypeFromMimeType(children.type) === 'audio' && (
        <audio src={URL.createObjectURL(children.data)} controls />
      )}
      {getContentTypeFromMimeType(children.type) === 'video' && (
        <video
          style={{ height: 200 }}
          src={URL.createObjectURL(children.data)}
          controls
        />
      )}
      {getContentTypeFromMimeType(children.type) === 'image' && (
        <IonImg
          style={{ height: 200 }}
          src={URL.createObjectURL(children.data)}
          alt="test"
        />
      )}
      {getContentTypeFromMimeType(children.type) === 'text' && (
        <IonTextarea disabled readonly value={children.data}></IonTextarea>
      )}
      {getContentTypeFromMimeType(children.type) === undefined &&
        !hasParameter && (
          <IonImg
            style={{ height: 200 }}
            src={`assets/placeholder.jpeg`}
            alt="test"
          />
        )}
      {getContentTypeFromMimeType(children.type) === undefined &&
        hasParameter && <IonSpinner name="crescent" />}
    </div>
  )
}
