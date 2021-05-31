import React from 'react'

import {
  IonList,
  IonText,
  IonItem,
  IonLabel,
  IonBadge,
  IonIcon,
  IonButton,
} from '@ionic/react'

import {
  badgeStatus,
  checkmarkIcon,
  currentSelectedTopic,
  doneStatusText,
  textLable,
} from './reflectionSubjectAreaUtils'

interface TopicItem {
  topicItemId: string
  topicItemLable: string
  topicItemDescribe: string
  subListItems: SubTopicItem[]
}

export interface SubTopicItem {
  subTopicItemId: string
  subjectLable: string
  subjectStatusCompleted: boolean
}

export type InputSelectValue = string | 'Später Wählen'

interface Props {
  selectValue: (input: InputSelectValue) => void
  topicList: TopicItem[]
}

/*
    The Component is designed to not store the selected value in the second level
    You must Provide a Callback-Function where the value is emitted to and store
    the state outside of this Component
 */
export const SubjectArea: React.FC<Props> = ({ topicList, selectValue }) => {
  // this state stores the current selected row
  // it is the id or undefined if nothing is selected
  const [currentSelected, setCurrentSelected] = React.useState<
    undefined | string
  >(undefined)

  const selectTopic = React.useCallback(
    (
      event:
        | React.MouseEvent<HTMLIonItemElement>
        | React.MouseEvent<HTMLIonButtonElement, MouseEvent>,
    ) => {
      //@ts-ignore
      const selectedTopic: string = event.target.getAttribute('data-id')

      setTimeout(() => {
        selectValue(selectedTopic)
      }, 300)
    },
    [selectValue],
  )

  // Set the currentSelected value to the clicked id
  // if the id is Already selected, set the current selected value to undefined
  // this Behavior is needed to unselect the row
  const handlerCurrentSelected = (
    event: React.MouseEvent<HTMLIonItemElement>,
  ): void => {
    //@ts-ignore
    const clickedRow = event.target.getAttribute('data-id')
    setCurrentSelected(currentSelected =>
      currentSelected === clickedRow ? undefined : clickedRow,
    )
  }

  const SubSubjectAreaList: React.FC<{ subListItems: SubTopicItem[] }> = ({
    subListItems,
  }) => {
    return (
      <IonList>
        {subListItems.map(
          (
            { subjectLable, subjectStatusCompleted, subTopicItemId },
            subIndex,
          ) => (
            <IonItem
              button
              data-test={subTopicItemId}
              data-id={subjectLable}
              onClick={selectTopic}
              key={`reflection-topic-list-${subjectLable}-${subIndex}`}
            >
              <IonLabel data-id={subjectLable}>{subjectLable}</IonLabel>
              <IonIcon
                data-id={subjectLable}
                icon={checkmarkIcon(subjectStatusCompleted).icon}
                color={checkmarkIcon(subjectStatusCompleted).color}
                slot="end"
              />
            </IonItem>
          ),
        )}
      </IonList>
    )
  }

  return (
    <>
      <IonList>
        {topicList.map(
          (
            { topicItemLable, topicItemId, topicItemDescribe, subListItems },
            index,
          ) => (
            <React.Fragment key={`reflection-topic-list-${index}`}>
              <IonItem
                button
                data-test={topicItemId}
                data-id={topicItemId}
                onClick={handlerCurrentSelected}
                color={currentSelectedTopic(currentSelected, topicItemId)}
              >
                <IonLabel
                  data-id={topicItemId}
                  color={textLable(currentSelected, topicItemId)}
                >
                  {topicItemLable}
                </IonLabel>
                <IonBadge
                  data-id={topicItemId}
                  color={badgeStatus(subListItems)}
                >
                  {doneStatusText(subListItems)}
                </IonBadge>
              </IonItem>
              {/* render the sublist only when the current selected value are equally the id in the current loop */}
              {currentSelected === topicItemId && (
                <>
                  <IonItem>
                    <IonText
                      color="medium"
                      className="ion-padding-top ion-padding-bottom"
                    >
                      {topicItemDescribe}
                    </IonText>
                  </IonItem>
                  <SubSubjectAreaList {...{ subListItems }} />
                </>
              )}
            </React.Fragment>
          ),
        )}
      </IonList>
      <IonButton
        data-id={'Später wählen'}
        data-test={'choseLater'}
        onClick={selectTopic}
      >
        Später wählen
      </IonButton>
    </>
  )
}
