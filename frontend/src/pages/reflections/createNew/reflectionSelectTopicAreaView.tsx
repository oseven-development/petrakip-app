import React from 'react'
import { IonContent, IonPage } from '@ionic/react'
import { RouteComponentProps } from 'react-router'

import { Header } from '../../../components'

import {
  TopicArea,
  InputSelectValue,
} from '../../../components/reflection/reflectionTopicArea/reflectionTopicArea'

import { ReflectionsRouting } from './reflectionCreateNewRouting'

import { listAllReflectionsTopicsAPI } from '../../../api/'
import { useCustomLoaderOnViewEnter } from '../../../hooks'

import { reflectionTopics } from '../../../data/reflectionTopic'
import { Auth } from 'aws-amplify'

interface Props extends RouteComponentProps<{}> {}

export const ReflectionSelectTopicAreaView: React.FC<Props> = ({
  history,
  location,
}) => {
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

  const calcFinsihedTopics = async (
    subTopics: { subTopic: string; owner: string }[],
  ) => {
    const user = await Auth.currentUserInfo()
    const finishedTopicAsArray = subTopics
      .filter(({ owner }) => owner === user.username)
      .map(({ subTopic }) => subTopic)
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
    const params = new URLSearchParams(location.search)
    const K = params.get('state')
    if (K) {
      const stateJson = JSON.parse(K)
      if (value === 'Später wählen') {
        stateJson.topic = ''
        stateJson.subTopic = ''
      } else {
        stateJson.topic = value.topic
        stateJson.subTopic = value.subTopic
      }

      const jsonState = JSON.stringify(stateJson)
      history.replace(`${ReflectionsRouting.module}?state=${jsonState}`)
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
