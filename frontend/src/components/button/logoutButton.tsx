import { IonButton } from '@ionic/react'
import { Auth } from 'aws-amplify'

export const LogoutButton = () => (
  <IonButton
    onClick={() => {
      Auth.signOut()
    }}
  >
    Ausloggen
  </IonButton>
)
