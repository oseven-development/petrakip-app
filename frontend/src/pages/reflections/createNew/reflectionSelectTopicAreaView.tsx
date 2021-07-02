import React from 'react'
import { IonContent, IonPage } from '@ionic/react'
import { Header } from '../../../components'
import { RouteComponentProps } from 'react-router'

import {
  SubjectArea,
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
    UpdateURLAndRoute(
      ReflectionQueryParamKeys.subTopic,
      value,
      ReflectionsRouting.module,
    )
  }
  return (
    <IonPage>
      <Header>Wähle ein Thema</Header>
      <IonContent fullscreen>
        {/* topicList must later be load via API, the import is only for testing purpose */}
        <SubjectArea topicList={listItems} selectValue={setMyState} />
      </IonContent>
    </IonPage>
  )
}
