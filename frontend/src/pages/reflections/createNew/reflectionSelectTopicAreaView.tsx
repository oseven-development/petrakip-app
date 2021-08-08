import React from 'react'
import {
  IonContent,
  IonLoading,
  IonPage,
  useIonViewWillEnter,
} from '@ionic/react'
import { Header } from '../../../components'
import { RouteComponentProps } from 'react-router'

import {
  TopicArea,
  InputSelectValue,
} from '../../../components/reflection/reflectionTopicArea/reflectionTopicArea'
import { useUpdateQueryParamState } from './useUpdateQueryParamState'

import { ReflectionsRouting } from './reflectionCreateNewRouting'
import { ReflectionQueryParamKeys } from './reflectionQueryParamKeys'

import { reflectionTopics } from '../../../data/reflectionTopic'
import { listAllReflectionsTopicsAPI } from '../../../api/'
import { useCustomLoaderOnViewEnter } from '../../../hooks'
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
      {/* <IonLoading isOpen={loader} message={'Themen werden geladen'} /> */}
      <IonContent fullscreen>
        {/* topicList must later be load via API, the import is only for testing purpose */}
        {!loadingState && (
          <TopicArea topicList={state} selectValue={setMyState} />
        )}
      </IonContent>
    </IonPage>
  )
}
