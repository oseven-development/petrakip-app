import React from 'react'
import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../../components'
import { RouteComponentProps } from 'react-router'

import {
  TopicArea,
  InputSelectValue,
} from '../../../components/reflection/reflectionTopicArea/reflectionTopicArea'
import { useUpdateQueryParamState } from './useUpdateQueryParamState'

import { ReflectionsRouting } from './reflectionCreateNewRouting'
import { ReflectionQueryParamKeys } from './reflectionQueryParamKeys'

import listItems from './testTopic'
interface Props extends RouteComponentProps<{}> {}

export const ReflectionSelectTopicAreaView: React.FC<Props> = ({ history }) => {
  const { UpdateURLAndRoute } = useUpdateQueryParamState(history)

  const setMyState = (value: InputSelectValue) => {
    if (value === 'Später wählen') {
      UpdateURLAndRoute(
        [
          {
            key: ReflectionQueryParamKeys.topic,
            value: '',
          },
          {
            key: ReflectionQueryParamKeys.subTopic,
            value: '',
          },
        ],
        ReflectionsRouting.module,
      )
    } else {
      const params = [
        {
          key: ReflectionQueryParamKeys.topic,
          value: value.topic,
        },
        {
          key: ReflectionQueryParamKeys.subTopic,
          value: value.subTopic,
        },
      ]

      UpdateURLAndRoute(params, ReflectionsRouting.module)
    }
  }
  return (
    <IonPage>
      <Header>Wähle ein Thema</Header>
      <IonContent fullscreen>
        {/* topicList must later be load via API, the import is only for testing purpose */}
        <TopicArea topicList={listItems} selectValue={setMyState} />
      </IonContent>
    </IonPage>
  )
}
