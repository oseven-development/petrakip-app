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

interface Props {
  children: string | string[]
  shareSlot?: any
  deleteSlot?: any
  customBackRoute?: string
}

const Header: React.FC<Props> = ({
  children,
  shareSlot,
  deleteSlot,
  customBackRoute,
}) => {
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
        {(shareSlot || deleteSlot) && (
          <IonButtons slot="end">
            {shareSlot}
            {deleteSlot && (
              <IonButton onClick={deleteSlot}>
                <IonIcon color="danger" slot="icon-only" icon={trash} />
              </IonButton>
            )}
          </IonButtons>
        )}
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
