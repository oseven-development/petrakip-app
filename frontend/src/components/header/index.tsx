import { IonHeader, IonTitle, IonToolbar } from '@ionic/react'

interface Props {
  children: string
}

const Header: React.FC<Props> = ({ children }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{children}</IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export { Header }
