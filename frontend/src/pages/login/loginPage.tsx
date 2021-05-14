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
} from '@ionic/react'

import './loginPage.css'
import Amplify from '@aws-amplify/core'
import AuthState from '../../model/authState'

interface LoginPageProps {
  setAuthState(authState: AuthState): void
}

const LoginPage: React.FC<LoginPageProps> = ({ setAuthState }) => {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  const [loginLoading, setLoginLoading] = useState(false)

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
        <div className="login-container">
          <p>Willkommen bei Metapholio, bitte melden sie sich an:</p>
          <IonCard className="input-card">
            <IonCardContent>
              <IonItem>
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
              <IonItem>
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
              expand="block"
              onClick={() => {
                console.log(`Trying to login with ${mail} and ${password}`)
                setLoginLoading(true)
                Amplify.Auth.signIn(mail, password)
                  .then((user: any) => {
                    setLoginLoading(false)
                    console.log(user)
                    if (user) {
                      // TODO: user daten in context laden?
                      setAuthState(AuthState.LoggedIn)
                    } else {
                      // TODO: unknown error, show toast
                    }
                  })
                  .catch((error: any) => {
                    // TODO: handle error, show toast
                    console.error(`Error occurred: `, error)
                    setLoginLoading(false)
                  })
              }}
            >
              {loginLoading ? <IonSpinner /> : 'Anmelden'}
            </IonButton>
            {/* TODO: set correct href to register page */}
            <IonButton
              expand="block"
              fill="outline"
              onClick={() => {
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
