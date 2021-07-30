import React from 'react'
import { IonButton, IonContent, IonPage } from '@ionic/react'
import { Header, ListComponent } from '../../../components'
import { RouteComponentProps, useLocation } from 'react-router'

import { ReflectionQueryParamKeys } from './reflectionQueryParamKeys'
import { ReflectionsRouting } from './reflectionCreateNewRouting'

import { loadAllMomentsAPI } from '../../../api/'
import { Moment } from '../../../API'
import { useUpdateQueryParamState } from './useUpdateQueryParamState'
import { getIconFromContentType } from '../../../utils/getContentTypeUtils'
import { groupArrayByDate } from '../../../utils/dateUtils'

interface Props extends RouteComponentProps<{}> {}

interface MomentWithSelected extends Moment {
  selected: boolean
}

export const ReflectionSelectMomentsView: React.FC<Props> = ({ history }) => {
  const location = useLocation()

  const [momentsState, setMoments] = React.useState<MomentWithSelected[]>([])
  const { currentUrl, UpdateURL } = useUpdateQueryParamState(history)

  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    const array = params
      .get(ReflectionQueryParamKeys.moment)
      ?.split(',')
      .map(el => el.split('#'))
      .map(([id, title, createdAt]) => ({ id, title, createdAt }))

    loadAllMomentsAPI().then(moments => {
      // TODO: fix type
      const nMoments = moments.map(moment => {
        // @ts-ignore
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

    const selectedMoments = momentsState
      .filter(value => value.selected)
      .map(key => `${key.id}#${key.title}#${key.createdAt}`)
      .toString()

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
        <ListComponent<any>
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
