import React from 'react'
import { IonButton, IonContent, IonItem, IonPage, IonText } from '@ionic/react'
import { Header } from '../../../components'
import { RouteComponentProps, useLocation } from 'react-router'

import { ReflectionQueryParamKeys } from './reflectionQueryParamKeys'
import { ReflectionsRouting } from './reflectionCreateNewRouting'

import { loadAllMomentsAPI } from '../../../api/'
import { Moment } from '../../../API'
import { useUpdateQueryParamState } from './useUpdateQueryParamState'

interface Props extends RouteComponentProps<{}> {}

interface MomentWithSelected extends Moment {
  selected: boolean
}

export const ReflectionSelectMomentsView: React.FC<Props> = ({ history }) => {
  const location = useLocation()
  const [state, setState] = React.useState<{
    [key: string]: MomentWithSelected
  }>({})

  const { currentUrl, UpdateURL } = useUpdateQueryParamState(history)

  React.useEffect(() => {
    const state: { [key: string]: MomentWithSelected } = {}

    const params = new URLSearchParams(location.search)
    const array = params.get(ReflectionQueryParamKeys.moment)?.split(',')

    loadAllMomentsAPI().then(moments => {
      moments.forEach(moment => {
        if (moment.id) {
          const preSelected = array?.includes(moment.id)
          state[moment.id] = { ...moment, selected: preSelected || false }
        }
      })
      setState(state)
    })
  }, [setState, location])

  const setMyState = (key: string) => {
    setState(state => {
      const item = state[key]
      return {
        ...state,
        [key]: { ...item, selected: !state[key].selected },
      }
    })
  }

  React.useEffect(() => {
    const selectedMoments = Object.entries(state)
      .filter(([key, value]) => value.selected)
      .map(([key]) => key)
      .toString()

    UpdateURL([
      { key: ReflectionQueryParamKeys.moment, value: selectedMoments },
    ])
  }, [UpdateURL, state])

  return (
    <IonPage>
      <Header>Select Moment</Header>
      <IonContent fullscreen>
        {Object.entries(state).map(([key, value]) => {
          return (
            <IonItem
              color={value.selected ? 'primary' : undefined}
              key={key}
              id={key}
              onClick={() => {
                setMyState(key)
              }}
            >
              <IonText>
                {value.title}
                <h6 style={{ fontSize: '0.5em' }}>{key}</h6>
              </IonText>
            </IonItem>
          )
        })}
        <br></br>

        <IonButton
          onClick={() => {
            history.push(`${ReflectionsRouting.module}${currentUrl}`)
          }}
        >
          Fertig
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
