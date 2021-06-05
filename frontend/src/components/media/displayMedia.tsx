import React from 'react'
import { Media } from '../../api/moment/saveMoment'
import { getContentTypeFromMimeType } from '../../utils/getContentTypeUtils'
import { IonImg, IonTextarea } from '@ionic/react'

interface Props {
  children: Media
}
export const DisplayMedia: React.FC<Props> = ({ children }) => {
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
      {getContentTypeFromMimeType(children.type) === undefined && (
        <IonImg
          style={{ height: 200 }}
          src={`assets/placeholder.jpeg`}
          alt="test"
        />
      )}
    </div>
  )
}
