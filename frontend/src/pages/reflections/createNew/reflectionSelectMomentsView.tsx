import React from 'react'
import { IonButton, IonContent, IonPage } from '@ionic/react'
import { Header, ListComponent } from '../../../components'
import { RouteComponentProps, useLocation } from 'react-router'

import { ReflectionQueryParamKeys } from './reflectionQueryParamKeys'
import { ReflectionsRouting } from './reflectionCreateNewRouting'

import { Moment } from '../../../API'
import { useUpdateQueryParamState } from './useUpdateQueryParamState'
import { getIconFromContentType } from '../../../utils/getContentTypeUtils'
import { groupArrayByDate } from '../../../utils/dateUtils'
import { extractDataFromArray } from '../reflectionUtils'
import { getMomentAPI } from '../../../api/moment/getMoment'

interface Props extends RouteComponentProps<{}> {}

interface MomentWithSelected extends Moment {
  selected: boolean
}

export const ReflectionSelectMomentsView: React.FC<Props> = ({ history }) => {
  const location = useLocation()

  const [momentsState, setMoments] = React.useState<MomentWithSelected[]>([])
  const { currentUrl, UpdateURL } = useUpdateQueryParamState(history)

  React.useEffect(() => {
    const array = extractDataFromArray<{ id: string }>(
      new URLSearchParams(location.search),
      ReflectionQueryParamKeys.moment,
    )

    getMomentAPI().then(moments => {
      const nMoments = moments.map(moment => {
        const k = array?.map(({ id }) => id).includes(moment.id)
        const t = moment as MomentWithSelected
        t['selected'] = k || false
        return t
      })
      setMoments(nMoments)
    })
  }, [setMoments, location.search])

  const updateState = (k: Moment) => {
    const i = momentsState.findIndex(element => element.id === k.id)
    momentsState[i].selected = !momentsState[i].selected
    setMoments([...momentsState])

    const filtered = momentsState.filter(value => value.selected)
    const selectedMoments = encodeURI(JSON.stringify(filtered))

    UpdateURL([
      { key: ReflectionQueryParamKeys.moment, value: selectedMoments },
    ])
  }

  return (
    <IonPage>
      <Header customBackRoute={`${ReflectionsRouting.module}${currentUrl}`}>
        Select Moment
      </Header>

      <IonContent fullscreen>
        <ListComponent<MomentWithSelected>
          elements={momentsState}
          onClickHandler={updateState}
          iconFunction={({ contentType }) =>
            getIconFromContentType(contentType)
          }
          sortFunction={groupArrayByDate}
        ></ListComponent>

        <IonButton
          routerLink={`${ReflectionsRouting.module}${currentUrl}`}
          color="primary"
        >
          Speichern
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
