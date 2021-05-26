import Auth from '@aws-amplify/auth'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import './login.css'

const VerifyAccount: React.FC = (props: any) => {
  const [codeSent, setCodeSent] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState('')
  const [presentToast] = useIonToast()

  useEffect(() => {
    if (props.authState === 'verifyContact' && !codeSent) {
      Auth.verifyCurrentUserAttribute('email')
        .then(_ => setCodeSent(true))
        .catch(error => showError(error?.message))
    }
  })

  if (props.authState !== 'verifyContact') {
    return null
  }

  const showError = (message?: string) => {
    presentToast(
      `Fehler: ${
        message ||
        'Etwas ist schiefgelaufen, bitte versuchen Sie es später noch einmal!'
      }`,
      2000,
    )
  }

  const verifyContact = () => {
    Auth.verifyCurrentUserAttributeSubmit('email', confirmationCode)
      .then(data => {
        console.log('[VerifyAccount] data:', data)
        props.onStateChange('signedIn')
      })
      .catch(error => showError(error?.message))
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Metapholio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Metapholio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <h2>Verifizieren des Accounts</h2>
          <IonItem class="ion-no-padding">
            <IonLabel position="stacked">Bestätigungs-Code</IonLabel>
            <IonInput
              placeholder="Bestätigungscode eingeben"
              type="number"
              value={confirmationCode}
              onIonChange={e => setConfirmationCode(e.detail.value ?? '')}
            ></IonInput>
          </IonItem>

          <IonButton
            disabled={!confirmationCode && codeSent}
            expand="block"
            onClick={() => verifyContact()}
          >
            Verifizieren
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default VerifyAccount
