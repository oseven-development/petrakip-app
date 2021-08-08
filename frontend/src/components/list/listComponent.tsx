import {
  IonItem,
  IonLabel,
  IonList,
  IonItemGroup,
  IonItemDivider,
  IonThumbnail,
  IonIcon,
  IonText,
  IonSegment,
  IonSegmentButton,
  useIonViewWillEnter,
} from '@ionic/react'
import { Auth } from 'aws-amplify'
import { star } from 'ionicons/icons'
import React from 'react'
import { usePlatform } from '../../hooks/usePlatform'
import { getLocaleDateString } from '../../utils/dateUtils'

enum Ownership {
  belongsToUser = 'belongsToUser',
  sharedFromOther = 'sharedFromOther',
}

interface Item {
  id?: string
  createdAt?: string | null | undefined
  title?: string | null | undefined
  selected?: boolean
  owner?: string | null | undefined
  isFavorite: boolean | null
}

interface Props<A extends Item> {
  elements: A[]
  onClickHandler: (A: A) => void
  iconFunction: (A: A) => string
  sortFunction: (A: A[]) => { [key: string]: A[] }
}

export function ListComponent<A extends Item>({
  elements,
  onClickHandler,
  iconFunction,
  sortFunction,
}: Props<A>) {
  const platform = usePlatform()

  const [state, setState] = React.useState(true)
  const [userId, setUserId] = React.useState('')

  useIonViewWillEnter(() => {
    Auth.currentAuthenticatedUser().then(id => {
      setUserId(id.username)
    })
  })

  const ownerShareFilter = ({ owner }: A) =>
    state ? owner === userId : owner !== userId

  const renderItem = (item: A) => (
    <IonItem
      color={item.selected ? 'primary' : undefined}
      key={`${item.id}`}
      button
      onClick={e => {
        e.preventDefault()
        onClickHandler(item)
      }}
      detail
    >
      <IonThumbnail
        slot="start"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IonIcon size="large" icon={iconFunction(item)} />
      </IonThumbnail>
      <IonLabel className="ion-text-wrap">
        <IonText>
          <h2>{item.title}</h2>
        </IonText>
        <p>{getLocaleDateString(new Date(item.createdAt || ''))}</p>
      </IonLabel>
      {item.isFavorite && <IonIcon color="warning" size="small" icon={star} />}
    </IonItem>
  )

  return (
    <>
      <div className={platform === 'ios' ? 'ion-padding' : ''}>
        <IonSegment
          onIonChange={e =>
            setState(e.detail.value === Ownership.belongsToUser)
          }
        >
          <IonSegmentButton value={Ownership.belongsToUser}>
            <IonLabel>Persönliche</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value={Ownership.sharedFromOther}>
            <IonLabel>Geteilte</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </div>
      <IonList>
        {Object.entries(sortFunction(elements)).map(([day, items]) => (
          <React.Fragment key={`${day}`}>
            {/* Check if we have to render the Group and display the day  */}
            {items.filter(ownerShareFilter).length !== 0 && (
              <IonItemGroup>
                <IonItemDivider>
                  <IonLabel>{day}</IonLabel>
                </IonItemDivider>
                {/* Filter all items that not match the filter */}
                {items.filter(ownerShareFilter).map(renderItem)}
              </IonItemGroup>
            )}
          </React.Fragment>
        ))}
      </IonList>
    </>
  )
}
