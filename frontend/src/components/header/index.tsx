import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
} from '@ionic/react'
import { share, trash } from 'ionicons/icons'

interface Props {
  children: string | string[]
  shareSlot?: any
  deleteSlot?: any
}

const Header: React.FC<Props> = ({ children, shareSlot, deleteSlot }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>{children}</IonTitle>
        {(shareSlot || deleteSlot) && (
          <IonButtons slot="end">
            {shareSlot}
            {deleteSlot && (
              <IonButton onClick={deleteSlot}>
                <IonIcon color="secondary" slot="icon-only" icon={trash} />
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
