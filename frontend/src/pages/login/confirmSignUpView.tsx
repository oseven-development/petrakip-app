import Auth from '@aws-amplify/auth'
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  useIonToast,
} from '@ionic/react'
import React, { useState } from 'react'
import { Header, LargeHeader } from '../../components'
import './login.css'

const ConfirmSignUpView: React.FC = (props: any) => {
  const [mail, setMail] = useState('')
  const [confirmationCode, setConfirmationCode] = useState('')
  const [presentToast] = useIonToast()

  if (props.authState !== 'confirmSignUp') {
    return null
  }

  const confirmSignUp = () => {
    Auth.confirmSignUp(mail, confirmationCode)
      .then(() => {
        props.onStateChange('signIn')
      })
      .catch(error => {
        console.error('Error during confirmation: ', error)
      })
  }

  const resendSignUp = () => {
    if (mail) {
      Auth.resendSignUp(mail).catch(error => {
        presentToast(
          `Fehler: ${
            error?.message || 'Bitte versuche es später noch einmal.'
          }`,
          2000,
        )
      })
      presentToast('Der Bestätigungscode wurde erneut gesendet', 2000)
    } else {
      presentToast('Bitte gebe deine Mailadresse an', 2000)
    }
  }

  return (
    <IonPage>
      <Header>Metapholio</Header>
      <IonContent>
        <LargeHeader>Metapholio</LargeHeader>
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
            onClick={confirmSignUp}
          >
            Bestätigen
          </IonButton>
          <IonButton
            expand="block"
            fill="clear"
            size="small"
            onClick={resendSignUp}
          >
            Code erneut zusenden
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export { ConfirmSignUpView }
