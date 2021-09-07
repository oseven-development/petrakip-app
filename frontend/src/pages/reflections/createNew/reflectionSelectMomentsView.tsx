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
import { useDebounce } from '../../../hooks'

interface Props extends RouteComponentProps<{}> {}

interface MomentWithSelected extends Moment {
  selected: boolean
}

export const ReflectionSelectMomentsView: React.FC<Props> = ({ history }) => {
  const location = useLocation()

  const [state, setState] = React.useState({})
  const [debouncedSearchTerm, pendingState] = useDebounce(state, 1000)

  const [momentsState, setMoments] = React.useState<MomentWithSelected[]>([])

  useIonViewDidEnter(() => {
    const params = new URLSearchParams(location.search)
    const urlState = params.get('state')
    if (urlState) {
      const state = JSON.parse(urlState)
      setState(state)

      getMomentAPI().then(moments => {
        const nMoments = moments.map(moment => {
          // @ts-ignore
          const k = state.momentObj?.map(({ id }) => id).includes(moment.id)
          const t = moment as MomentWithSelected
          t['selected'] = k || false
          return t
        })
        setMoments(nMoments)
      })
    }
  }, [])

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

  React.useEffect(() => {
    const jsonState = JSON.stringify(debouncedSearchTerm)
    history.push(`${history.location.pathname}?state=${jsonState}`)
  }, [debouncedSearchTerm, history])

  return (
    <IonPage>
      <Header
        disabled={pendingState}
        customBackRoute={`${ReflectionsRouting.module}?state=${JSON.stringify(
          debouncedSearchTerm,
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
        disabled={pendingState}
        expand="block"
        routerLink={`${ReflectionsRouting.module}?state=${JSON.stringify(
          debouncedSearchTerm,
        )}`}
        routerDirection="back"
      >
        <IonIcon slot="start" icon={save}></IonIcon>
        Speichern
      </IonButton>
    </IonPage>
  )
}
