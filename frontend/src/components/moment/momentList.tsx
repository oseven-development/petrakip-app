import React from 'react'
import {
  IonItem,
  IonLabel,
  IonList,
  IonItemGroup,
  IonItemDivider,
  IonThumbnail,
  IonIcon,
  IonText,
} from '@ionic/react'
import { getIconFromContentType } from '../../utils/getContentTypeUtils'
import { Moment } from '../../API'
import { getLocaleDateString } from '../../utils/dateUtils'

interface Props {
  moments: { [key: string]: Moment[] }
  onClickHandler: Function
}
export const MomentList: React.FC<Props> = ({ moments, onClickHandler }) => {
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
