import React from 'react'
import { IonContent, IonPage } from '@ionic/react'
import { RouteComponentProps } from 'react-router'

import { Header } from '../../../components'

import {
  TopicArea,
  InputSelectValue,
} from '../../../components/reflection/reflectionTopicArea/reflectionTopicArea'

import { useUpdateQueryParamState } from './useUpdateQueryParamState'

import { ReflectionsRouting } from './reflectionCreateNewRouting'
import { ReflectionQueryParamKeys } from './reflectionQueryParamKeys'

import { listAllReflectionsTopicsAPI } from '../../../api/'
import { useCustomLoaderOnViewEnter } from '../../../hooks'

import { reflectionTopics } from '../../../data/reflectionTopic'

interface Props extends RouteComponentProps<{}> {}

export const ReflectionSelectTopicAreaView: React.FC<Props> = ({ history }) => {
  const { UpdateURLAndRoute } = useUpdateQueryParamState(history)
  const [state, setState] = React.useState<
    {
      topicItemLable: string
      topicItemId: string
      topicItemDescribe: string
      subListItems: {
        subTopicItemId: string
        subjectLable: string
        subjectStatusCompleted: boolean
      }[]
    }[]
  >([])

  const calcFinsihedTopics = (subTopics: { subTopic: string }[]) => {
    const finishedTopicAsArray = subTopics.map(({ subTopic }) => subTopic)
    const topicList = reflectionTopics.map(topic => {
      topic.subListItems = topic.subListItems.map(subTopics => {
        subTopics.subjectStatusCompleted = finishedTopicAsArray.includes(
          subTopics.subjectLable,
        )
        return subTopics
      })
      return topic
    })
    setState(topicList)
  }

  const [LoadingComponent, loadingState] = useCustomLoaderOnViewEnter({
    promise: listAllReflectionsTopicsAPI(),
    callback: calcFinsihedTopics,
    loadingMessage: 'Themen werden geladen',
  })

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
      {/* ############################ Loading ############################ */}
      {LoadingComponent}
      <IonContent fullscreen>
        {/* topicList must later be load via API, the import is only for testing purpose */}
        {!loadingState && (
          <TopicArea topicList={state} selectValue={setMyState} />
        )}
      </IonContent>
    </IonPage>
  )
}
