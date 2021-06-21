import {
  IonContent,
  IonPage,
  IonButton,
  useIonViewWillEnter,
  IonIcon,
} from '@ionic/react'

import { Header } from '../../components'
import { RouteComponentProps } from 'react-router'
import { LargeHeader } from '../../components/header'
import { useState } from 'react'
import { getMomentAPI } from '../../api/moment/getMoment'
import { groupArrayByDate } from '../../utils/dateUtils'
import { MomentList } from '../../components/moment/momentList'
import { Moment } from '../../API'
import { add } from 'ionicons/icons'
import { getSharedAsset } from '../../api/moment/getMomentAsset'

interface Props extends RouteComponentProps<{}> {}

export const MomentsListView: React.FC<Props> = ({ history }) => {
  const [moments, setMoments] = useState<{ [key: string]: Moment[] } | {}>({})

  // useIonViewWillEnter because of navigation benefits
  useIonViewWillEnter(() => {
    getMomentAPI({}).then(res => {
      setMoments(groupArrayByDate(res.items))
    })
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
        Momente List View
      </Header>
      <IonContent fullscreen>
        <LargeHeader>Momente List View</LargeHeader>

        <MomentList moments={moments} onClickHandler={history.push} />
      </IonContent>
    </IonPage>
  )
}
