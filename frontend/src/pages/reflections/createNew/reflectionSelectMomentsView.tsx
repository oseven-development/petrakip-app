import React from 'react'
import { RouteComponentProps } from 'react-router'
import { useLocation } from 'react-router-dom'

import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react'
import { save } from 'ionicons/icons'

import { Header, ListComponent } from '../../../components'

import { useUpdateQueryParamState } from './useUpdateQueryParamState'

import { getIconFromContentType, groupArrayByDate } from '../../../utils/'
import { extractDataFromArray } from '../reflectionUtils'

import { Moment } from '../../../API'
import { getMomentAPI } from '../../../api/'

import { ReflectionQueryParamKeys } from './reflectionQueryParamKeys'
import { ReflectionsRouting } from './reflectionCreateNewRouting'

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
        <ListComponent<Moment>
          elements={momentsState}
          onClickHandler={updateState}
          iconFunction={({ contentType }) =>
            getIconFromContentType(contentType)
          }
          sortFunction={groupArrayByDate}
        ></ListComponent>
      </IonContent>
      <IonButton
        expand="block"
        routerLink={`${ReflectionsRouting.module}${currentUrl}`}
        routerDirection="back"
      >
        <IonIcon slot="start" icon={save}></IonIcon>
        Speichern
      </IonButton>
    </IonPage>
  )
}
