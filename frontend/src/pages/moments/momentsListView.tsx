import { useState } from 'react'
import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react'
import { RouteComponentProps } from 'react-router'

import {
  CreateButton,
  Header,
  LargeHeader,
  ListComponent,
  FilterDialog,
  FilterToggle,
} from '../../components'

import { getMomentAPI } from '../../api/'
import { Moment } from '../../API'
import { groupArrayByDate, getIconFromContentType } from '../../utils'

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
        iconSlot={[
          <FilterToggle
            showFilter={showFilter}
            setShowFilter={setShowFilter}
          ></FilterToggle>,
          <CreateButton routerLink={'/moments/create'} />,
        ]}
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
