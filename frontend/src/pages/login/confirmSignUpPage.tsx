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
import React, { useEffect, useState } from 'react'
import { useRegister } from '../../model/registerContext'
import './login.css'

const ConfirmSignUpPage: React.FC = () => {
  const [mail, setMail] = useState('')
  const [confirmationCode, setConfirmationCode] = useState('')
  const [presentToast] = useIonToast()

  const registerContext = useRegister()

  useEffect(() => {
    setMail(registerContext.mail)
  }, [registerContext.mail])

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
          <h2>Bestätige deine Anmeldung</h2>
          <p>Hierfür wurde dir der Code per Mail zugeschickt:</p>
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
              <IonItem class="ion-no-padding">
                <IonLabel position="stacked">Bestätigungs-Code</IonLabel>
                <IonInput
                  placeholder="Bestätigungscode eingeben"
                  type="number"
                  value={confirmationCode}
                  onIonChange={e => setConfirmationCode(e.detail.value ?? '')}
                ></IonInput>
              </IonItem>
            </IonCardContent>
          </IonCard>
          <IonButton
            disabled={!(mail && confirmationCode)}
            expand="block"
            onClick={() => {
              Auth.confirmSignUp(mail, confirmationCode)
                .then(result => {
                  console.log('Successfully confirmed: ', result)
                  Auth.signIn(mail, registerContext.password)
                })
                .catch(error => {
                  console.error('Error during confirmation: ', error)
                })
            }}
          >
            Bestätigen
          </IonButton>
          <IonButton
            expand="block"
            fill="clear"
            size="small"
            onClick={() => {
              if (mail) {
                Auth.resendSignUp(mail).catch(error => {
                  presentToast(
                    `Fehler: ${
                      error?.message ||
                      'Bitte versuchen Sie es später noch einmal.'
                    }`,
                    2000,
                  )
                })
                presentToast('Der Bestätigungscode wurde erneut gesendet', 2000)
              } else {
                presentToast('Bitte geben sie Ihre Mailadresse an', 2000)
              }
            }}
          >
            Code erneut zusenden
          </IonButton>
          <IonButton
            expand="block"
            fill="outline"
            onClick={() => Auth.signOut()}
          >
            Ausloggen
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ConfirmSignUpPage
