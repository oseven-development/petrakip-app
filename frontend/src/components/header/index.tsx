import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
} from '@ionic/react'
import { arrowBackOutline, trash } from 'ionicons/icons'
import React from 'react'

interface Props {
  children: string | string[]
  iconSlot?: JSX.Element[]
  deleteSlot?: (e: any) => void
  customBackRoute?: string
  disabled?: boolean
}

const Header: React.FC<Props> = ({
  children,
  iconSlot,
  deleteSlot,
  customBackRoute,
  disabled = false,
}) => {
  const HeaderButtons = () =>
    !disabled &&
    (iconSlot || deleteSlot) && (
      <IonButtons slot="end">
        {iconSlot?.map((el, i) => (
          <React.Fragment key={el.type + i}>{el}</React.Fragment>
        ))}
        {deleteSlot && (
          <IonButton onClick={deleteSlot}>
            <IonIcon color="danger" slot="icon-only" icon={trash} />
          </IonButton>
        )}
      </IonButtons>
    )

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          {customBackRoute === undefined ? (
            <IonBackButton text="zurück" />
          ) : (
            <IonButton routerLink={customBackRoute} color="primary">
              <IonIcon color="dark" slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          )}
        </IonButtons>
        <IonTitle>{children}</IonTitle>
        {HeaderButtons()}
      </IonToolbar>
    </IonHeader>
  )
}
const LargeHeader: React.FC<Props> = ({ children }) => {
  return (
    <IonHeader collapse="condense">
      <IonToolbar>
        <IonTitle size="large">{children}</IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export { Header, LargeHeader }
