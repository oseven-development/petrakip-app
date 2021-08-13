import { IonButton } from '@ionic/react'

interface Props {
  routerLink: string
}

export const CreateButton = ({ routerLink }: Props) => (
  <IonButton routerLink={routerLink} color="primary" routerDirection="forward">
    Erstellen
  </IonButton>
)
