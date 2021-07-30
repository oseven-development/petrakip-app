import {
  IonContent,
  IonPage,
  IonButton,
  useIonViewWillEnter,
} from '@ionic/react'

import { Header, LargeHeader, ListComponent } from '../../components'
import { RouteComponentProps } from 'react-router'
import { useState } from 'react'
import { getMomentAPI } from '../../api/moment/getMoment'
import { groupArrayByDate } from '../../utils/dateUtils'
// import { MomentList } from '../../components/moment/momentList'
import { Moment } from '../../API'
import { getIconFromContentType } from '../../utils/getContentTypeUtils'

interface Props extends RouteComponentProps<{}> {}

export const MomentsListView: React.FC<Props> = ({ history }) => {
  const [moments, setMoments] = useState<Moment[]>([])

  // useIonViewWillEnter because of navigation benefits
  useIonViewWillEnter(() => {
    getMomentAPI().then(setMoments)
  })

  return (
    <IonPage>
      <Header
        shareSlot={
          <IonButton routerLink="/moments/create" color="primary">
            Erstellen
          </IonButton>
        }
      >
        Momente
      </Header>
      <IonContent fullscreen>
        <LargeHeader>Momente</LargeHeader>

        <ListComponent<Moment>
          elements={moments}
          onClickHandler={moment => {
            history.push({
              pathname: `/moments/details/${moment.id}`,
              state: { moment: moment },
            })
          }}
          iconFunction={({ contentType }) =>
            getIconFromContentType(contentType)
          }
          sortFunction={groupArrayByDate}
        ></ListComponent>
      </IonContent>
    </IonPage>
  )
}
