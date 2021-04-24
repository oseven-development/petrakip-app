import { IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { PropsWithChildren } from 'react'

interface Props {
  pageTitle: string
}

const Header: React.FC<Props> = ({ pageTitle }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  )
}

export default Header
