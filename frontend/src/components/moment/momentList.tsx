import React from 'react'
import {
  IonContent,
  IonPage,
  IonImg,
  IonItem,
  IonInput,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonTextarea,
  IonToast,
  useIonViewWillEnter,
  IonItemGroup,
  IonItemDivider,
  IonThumbnail,
  IonIcon,
  IonText,
} from '@ionic/react'
import { Media } from '../../api/moment/saveMoment'
import {
  getContentTypeFromMimeType,
  getIconFromContentType,
} from '../../utils/getContentTypeUtils'
import { Moment } from '../../API'
import { getLocaleDateString } from '../../utils/dateUtils'

interface Props {
  moments: { [key: string]: Moment[] }
  onClickHandler: Function
}
export const MomentList: React.FC<Props> = ({ moments, onClickHandler }) => {
  console.log(onClickHandler)
  console.log(moments)
  return (
    <IonList>
      {Object.entries(moments).map(([day, moments]: any) => (
        <IonItemGroup key={`${day}`}>
          <IonItemDivider>
            <IonLabel>{day}</IonLabel>
          </IonItemDivider>
          {moments.map((moment: any, i: number) => (
            <IonItem
              key={`${i}`}
              button
              onClick={e => {
                e.preventDefault()
                // history.push({
                onClickHandler({
                  pathname: `/moments/details/${moment.id}`,
                  state: { moment: moment },
                })
              }}
              detail
            >
              <IonThumbnail
                slot="start"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IonIcon
                  size="large"
                  icon={getIconFromContentType(moment.contentType)}
                />
              </IonThumbnail>
              <IonLabel className="ion-text-wrap">
                <IonText>
                  <h2>{moment.title}</h2>
                </IonText>
                <p>{getLocaleDateString(moment.createdAt)}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonItemGroup>
      ))}
    </IonList>
  )
}
