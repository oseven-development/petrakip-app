import {
  IonButton,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonListHeader,
  IonLabel,
  IonList,
  IonItem,
  IonInput,
  IonContent,
  IonCard,
  IonCheckbox,
  useIonViewWillEnter,
} from '@ionic/react'
import { checkmarkCircle, closeCircle, filter, share } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { checkUserAndShareAssetAPI, shareAPI } from '../../api/index'
import { useCustomLoaderOnTrigger } from '../../hooks'
import { AssetType, assetTypeDict } from '../../types/assetType'
import { CheckShareUser, ShareUser } from '../../types/shareUser'

interface Props {
  showFilter: any
  setShowFilter?: any
  elements?: any
  setElements?: any
}

const FilterToggle: React.FC<Props> = ({ showFilter, setShowFilter }) => {
  return (
    <IonButton onClick={() => setShowFilter(!showFilter)}>
      <IonIcon color="primary" slot="icon-only" icon={filter} />
    </IonButton>
  )
}

const FilterDialog: React.FC<Props> = ({
  showFilter,
  elements,
  setElements,
}) => {
  const [fullText, setFullText] = useState<string>('')
  const [filterTags, setFilterTags] = useState<any>({})

  useEffect(() => {
    const preparedFilterTags: any = Object.assign(
      {},
      ...elements
        .map((e: any) => e.tags)
        .flat()
        .filter((x: any, i: any, a: any) => a.indexOf(x) === i)
        .map((e: any) => ({
          [e]: { label: e, isChecked: false },
        }))
        .filter((x: any) => Object.keys(x)[0].length > 0),
    )
    // @ts-ignore
    setFilterTags(preparedFilterTags)
  }, [elements])

  const filterElements = () => {
    const getCheckedTags = Object.values(filterTags)
      .filter((t: any) => t.isChecked === true)
      .map((t: any) => t.label)
    const filteredElements = elements
      .filter((e: any) => e.title.includes(fullText))
      .filter((e: any) =>
        getCheckedTags.every((t: string) => e.tags.includes(t)),
      )
    setElements(filteredElements)
  }

  const checkTags = (tag: any) => {
    setFilterTags({
      ...filterTags,
      [tag.label]: { label: tag.label, isChecked: !tag.isChecked },
    })
  }

  return (
    <>
      {showFilter && (
        <IonList>
          <IonItem>
            <IonLabel position="floating">Volltext-Suche</IonLabel>
            <IonInput
              value={fullText}
              onIonChange={e => setFullText(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
          <IonItem>
            {Object.values(filterTags).map((tag: any) => (
              <IonButton
                key={tag.label}
                color={tag.isChecked ? 'primary' : 'medium'}
                onClick={() => {
                  checkTags(tag)
                }}
              >
                {tag.label}
              </IonButton>
            ))}
          </IonItem>
          <IonButton
            color="primary"
            expand="block"
            onClick={() => filterElements()}
          >
            <IonIcon slot="start" icon={checkmarkCircle}></IonIcon>
            filter anwenden
          </IonButton>
        </IonList>
      )}
    </>
  )
}
export { FilterToggle, FilterDialog }
