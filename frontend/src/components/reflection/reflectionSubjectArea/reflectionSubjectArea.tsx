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
  id: string
  lable: string
  describe: string
  subListItems: SubTopicItem[]
}

export interface SubTopicItem {
  id: string
  lable: string
  done: boolean
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
        {subListItems.map(({ lable, done, id }, subIndex) => (
          <IonItem
            button
            data-test={id}
            data-id={lable}
            onClick={selectTopic}
            key={`reflection-topic-list-${lable}-${subIndex}`}
          >
            <IonLabel data-id={lable}>{lable}</IonLabel>
            <IonIcon
              data-id={lable}
              icon={checkmarkIcon(done).icon}
              color={checkmarkIcon(done).color}
              slot="end"
            />
          </IonItem>
        ))}
      </IonList>
    )
  }

  return (
    <>
      <IonList>
        {topicList.map(({ lable, id, describe, subListItems }, index) => (
          <React.Fragment key={`reflection-topic-list-${index}`}>
            <IonItem
              button
              data-test={id}
              data-id={id}
              onClick={handlerCurrentSelected}
              color={currentSelectedTopic(currentSelected, id)}
            >
              <IonLabel data-id={id} color={textLable(currentSelected, id)}>
                {lable}
              </IonLabel>
              <IonBadge data-id={id} color={badgeStatus(subListItems)}>
                {doneStatusText(subListItems)}
              </IonBadge>
            </IonItem>
            {/* render the sublist only when the current selected value are equally the id in the current loop */}
            {currentSelected === id && (
              <>
                <IonItem>
                  <IonText
                    color="medium"
                    className="ion-padding-top ion-padding-bottom"
                  >
                    {describe}
                  </IonText>
                </IonItem>
                <SubSubjectAreaList {...{ subListItems }} />
              </>
            )}
          </React.Fragment>
        ))}
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
