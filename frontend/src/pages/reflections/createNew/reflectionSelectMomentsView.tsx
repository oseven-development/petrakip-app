import React from 'react'
import { RouteComponentProps } from 'react-router'
import { useLocation } from 'react-router-dom'

import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  useIonViewDidEnter,
} from '@ionic/react'
import { save } from 'ionicons/icons'

import { Header, ListComponent } from '../../../components'

import { getIconFromContentType, groupArrayByDate } from '../../../utils/'

import { Moment } from '../../../API'
import { getMomentAPI } from '../../../api/'

import { ReflectionsRouting } from './reflectionCreateNewRouting'

interface Props extends RouteComponentProps<{}> {}

interface MomentWithSelected extends Moment {
  selected: boolean
}

export const ReflectionSelectMomentsView: React.FC<Props> = ({ history }) => {
  const location = useLocation()

  const [state, setState] = React.useState({})
  const [momentsState, setMoments] = React.useState<MomentWithSelected[]>([])

  useIonViewDidEnter(() => {
    const params = new URLSearchParams(location.search)
    const urlState = params.get('state')
    if (urlState) {
      const jsonState = JSON.parse(urlState)
      setState(jsonState)
      getMomentAPI().then(moments => {
        const nMoments = moments.map(moment => {
          // @ts-ignore
          const k = jsonState.momentIDs?.includes(moment.id)
          const t = moment as MomentWithSelected
          t['selected'] = k || false
          return t
        })
        setMoments(nMoments)
      })
    }
  }, [location.search])

  const updateState = (k: Moment) => {
    const i = momentsState.findIndex(element => element.id === k.id)
    momentsState[i].selected = !momentsState[i].selected
    setMoments([...momentsState])
    const filtered = momentsState.filter(value => value.selected)
    const reduced = filtered.map(({ id, createdAt, title }) => ({
      id,
      createdAt,
      title,
    }))

    setState(state => {
      //@ts-ignore
      state.momentIDs = reduced.map(({ id }) => id)
      //@ts-ignore
      state.momentObj = reduced
      return { ...state }
    })
  }

  return (
    <IonPage>
      <Header
        customBackRoute={`${ReflectionsRouting.module}?state=${JSON.stringify(
          state,
        )}`}
      >
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
        // disabled={pendingState}
        expand="block"
        routerLink={`${ReflectionsRouting.module}?state=${JSON.stringify(
          state,
        )}`}
        routerDirection="back"
      >
        <IonIcon slot="start" icon={save}></IonIcon>
        Speichern
      </IonButton>
    </IonPage>
  )
}
