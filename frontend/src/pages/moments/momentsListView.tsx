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
import { FilterDialog, FilterToggle } from '../../components/filter/filter'

interface Props extends RouteComponentProps<{}> {}

export const MomentsListView: React.FC<Props> = ({ history }) => {
  const [moments, setMoments] = useState<Moment[]>([])
  const [momentsFiltered, setMomentsFiltered] = useState<Moment[]>([])
  const [showFilter, setShowFilter] = useState(false)

  // useIonViewWillEnter because of navigation benefits
  useIonViewWillEnter(() => {
    getMomentAPI().then(res => {
      setMoments(res)
      setMomentsFiltered(res)
    })
  })

  return (
    <IonPage>
      <Header
        shareSlot={
          <>
            <FilterToggle
              showFilter={showFilter}
              setShowFilter={setShowFilter}
            ></FilterToggle>

            <IonButton routerLink="/moments/create" color="primary">
              Erstellen
            </IonButton>
          </>
        }
      >
        Momente
      </Header>
      <IonContent fullscreen>
        <LargeHeader>Momente</LargeHeader>
        <FilterDialog
          showFilter={showFilter}
          elements={moments}
          setElements={setMomentsFiltered}
        ></FilterDialog>
        <ListComponent<Moment>
          elements={momentsFiltered}
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
