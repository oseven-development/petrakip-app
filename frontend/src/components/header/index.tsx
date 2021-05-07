import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from '@ionic/react'

interface Props {
  children: string | string[]
}

const Header: React.FC<Props> = ({ children }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>{children}</IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export { Header }
