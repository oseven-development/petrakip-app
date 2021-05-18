import React, { useState } from 'react'
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
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'

import './loginPage.css'
import Amplify from '@aws-amplify/core'
import AuthState from '../../model/authState'
import { useRegisterUpdate } from '../../model/registerContext'

interface LoginPageProps {
  setAuthState(authState: AuthState): void
}

const LoginPage: React.FC<LoginPageProps> = ({ setAuthState }) => {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [presentToast] = useIonToast()

  const [loginLoading, setLoginLoading] = useState(false)

  const registerContextUpdate = useRegisterUpdate()

  var buttonDisabled = !(mail && password)

  const showError = (message?: string) => {
    presentToast(
      `Fehler: ${
        message ||
        'Etwas ist schiefgelaufen, bitte versuchen Sie es später noch einmal!'
      }`,
      2000,
    )
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
          <p>Willkommen bei Metapholio, bitte melden sie sich an:</p>
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
                <IonLabel position="stacked">Passwort</IonLabel>
                <IonInput
                  pattern="password"
                  placeholder="Passwort eingeben"
                  type="password"
                  value={password}
                  onIonChange={e => setPassword(e.detail.value ?? '')}
                ></IonInput>
              </IonItem>
            </IonCardContent>
          </IonCard>
          <div className="button-container">
            <IonButton
              disabled={buttonDisabled}
              expand="block"
              onClick={() => {
                console.log(`Trying to login with ${mail} and ${password}`)
                setLoginLoading(true)
                Amplify.Auth.signIn(mail, password)
                  .then((user: any) => {
                    setLoginLoading(false)
                    console.log(user)
                    if (user) {
                      setAuthState(AuthState.LoggedIn)
                    } else {
                      showError()
                      setLoginLoading(false)
                    }
                  })
                  .catch((error: any) => {
                    showError(error.message)
                    console.error(`Error occurred: `, error)

                    setLoginLoading(false)
                  })
              }}
            >
              {loginLoading ? <IonSpinner /> : 'Anmelden'}
            </IonButton>
            <IonButton
              disabled={buttonDisabled}
              expand="block"
              fill="outline"
              onClick={() => {
                registerContextUpdate.setMailAndPassword(mail, password)
                setAuthState(AuthState.Registering)
              }}
            >
              Registrieren
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default LoginPage
