import {
  IonContent,
  IonPage,
  IonButton,
  useIonViewWillEnter,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonCard,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonAvatar,
  IonThumbnail,
  IonIcon,
  IonItemGroup,
  IonItemDivider,
} from '@ionic/react'

import { Header } from '../../components'
import { RouteComponentProps } from 'react-router'
import { LargeHeader } from '../../components/header'
import { useEffect, useState } from 'react'
import { Moment } from '../../API'
import { getMomentAPI } from '../../api/moment/getMoment'
import { getIconFromContentType } from '../../utils/getContentTypeUtils'
import { getLocaleDateString, groupArrayByDate } from '../../utils/dateUtils'

interface Props extends RouteComponentProps<{}> {}

export const MomentsListView: React.FC<Props> = ({ history }) => {
  const [moments, setMoments] = useState<any>([])

  useEffect(() => {
    getMomentAPI({}).then(res => {
      setMoments(groupArrayByDate(res.items))
    })

    // can't add as dependency will cause error in ionic
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <IonPage>
      <Header>Momente List View</Header>
      <IonContent fullscreen>
        <LargeHeader>Momente List View</LargeHeader>
        <IonButton routerLink="/moments/create" color="primary">
          Erstellen
        </IonButton>
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
                    console.log(moment)
                    e.preventDefault()
                    history.push({
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
      </IonContent>
    </IonPage>
  )
}
