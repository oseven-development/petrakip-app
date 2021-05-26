import Auth from '@aws-amplify/auth'
import {
  IonButton,
  IonCard,
  IonCardContent,
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
import React, { useState } from 'react'
import './login.css'

const ForgotPasswordPage: React.FC = (props: any) => {
  const [mail, setMail] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [presentToast] = useIonToast()

  if (props.authState !== 'forgotPassword') {
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

  const sendCode = () => {
    Auth.forgotPassword(mail)
      .then(data => {
        console.log('data: ', data)
        setCodeSent(true)
      })
      .catch(error => showError(error?.message))
  }

  const confirmNewPassword = () => {
    Auth.forgotPasswordSubmit(mail, confirmationCode, newPassword)
      .then(_ => {
        props.onStateChange('signedIn')
      })
      .catch(error => showError(error?.message))
  }

  const backToSignIn = () => {
    props.onStateChange('signIn')
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
          <h2>Zurücksetzen des Passworts</h2>
          {codeSent ? (
            <>
              <p>
                Zurücksetzen des Passworts für <br />
                {mail}
              </p>
              <IonItem class="ion-no-padding">
                <IonLabel position="stacked">Bestätigungs-Code</IonLabel>
                <IonInput
                  placeholder="Bestätigungscode eingeben"
                  type="number"
                  value={confirmationCode}
                  onIonChange={e => setConfirmationCode(e.detail.value ?? '')}
                ></IonInput>
              </IonItem>
              <IonItem class="ion-no-padding">
                <IonLabel position="stacked">Passwort</IonLabel>
                <IonInput
                  pattern="password"
                  placeholder="Passwort eingeben"
                  type="password"
                  value={newPassword}
                  onIonChange={e => setNewPassword(e.detail.value ?? '')}
                ></IonInput>
              </IonItem>
              <IonButton
                disabled={!(mail && confirmationCode && newPassword)}
                expand="block"
                fill="solid"
                onClick={() => confirmNewPassword()}
              >
                Bestätigen
              </IonButton>
              <IonButton
                expand="block"
                fill="clear"
                size="small"
                onClick={() => sendCode()}
              >
                Code erneut zusenden
              </IonButton>
            </>
          ) : (
            <>
              <p>Bitte geben Sie Ihre Mailadresse ein</p>
              <IonCard className="input-card">
                <IonCardContent>
                  <IonItem class="ion-no-padding">
                    <IonLabel position="stacked">Mailadresse</IonLabel>
                    <IonInput
                      autocomplete="email"
                      inputmode="email"
                      pattern="email"
                      placeholder="Mailadresse eingeben"
                      type="email"
                      value={mail}
                      onIonChange={e => setMail(e.detail.value ?? '')}
                    ></IonInput>
                  </IonItem>
                </IonCardContent>
              </IonCard>
              <IonButton
                disabled={!mail}
                expand="block"
                onClick={() => sendCode()}
              >
                Code senden
              </IonButton>
              <IonButton
                expand="block"
                fill="clear"
                size="small"
                onClick={() => backToSignIn()}
              >
                Zurück zur Anmeldung
              </IonButton>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ForgotPasswordPage
