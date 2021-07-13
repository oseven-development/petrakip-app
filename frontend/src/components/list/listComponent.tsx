import {
  IonItem,
  IonLabel,
  IonList,
  IonItemGroup,
  IonItemDivider,
  IonThumbnail,
  IonIcon,
  IonText,
} from '@ionic/react'
import { getLocaleDateString } from '../../utils/dateUtils'

interface Item {
  id: string
  createdAt?: string | null | undefined
  title?: string | null | undefined
  selected?: boolean
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
  return (
    <IonList>
      {Object.entries(sortFunction(elements)).map(([day, items]) => (
        <IonItemGroup key={`${day}`}>
          <IonItemDivider>
            <IonLabel>{day}</IonLabel>
          </IonItemDivider>
          {items.map(item => (
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
            </IonItem>
          ))}
        </IonItemGroup>
      ))}
    </IonList>
  )
}
