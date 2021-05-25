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
  IonNav,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'

import './login.css'
import Amplify from '@aws-amplify/core'
import { useRegisterUpdate } from '../../model/registerContext'

const LoginPage: React.FC = (props: any) => {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [presentToast] = useIonToast()

  const [loginLoading, setLoginLoading] = useState(false)

  const registerContextUpdate = useRegisterUpdate()

  if (props.authState !== 'signIn') {
    return null
  }

  console.log('[LoginPage] Props: ', props)

  const showError = (message?: string) => {
    presentToast(
      `Fehler: ${
        message ||
        'Etwas ist schiefgelaufen, bitte versuchen Sie es später noch einmal!'
      }`,
      2000,
    )
  }

  const tryLogin = () => {
    setLoginLoading(true)
    Amplify.Auth.signIn(mail, password)
      .then((user: any) => {
        setLoginLoading(false)
        console.log(user)
        if (user) {
          // setAuthState(AuthState.LoggedIn)
        } else {
          showError()
          setLoginLoading(false)
        }
      })
      .catch((error: any) => {
        showError(error.message)
        console.error(`Error occurred: `, error)
        if (error.name === 'UserNotConfirmedException') {
          // setAuthState(AuthState.ConfirmSignUp)
        }

        setLoginLoading(false)
      })
  }

  const registerClicked = () => {
    registerContextUpdate.setMailAndPassword(mail, password)

    props.onStateChange('signUp')
    // setAuthState(AuthState.Registering)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Metapholio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonNav>
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
                disabled={!(mail && password)}
                expand="block"
                onClick={() => tryLogin}
              >
                {loginLoading ? <IonSpinner /> : 'Anmelden'}
              </IonButton>
              <IonButton
                expand="block"
                fill="outline"
                onClick={() => registerClicked()}
              >
                Registrieren
              </IonButton>
            </div>
          </div>
        </IonNav>
      </IonContent>
    </IonPage>
  )
}

export default LoginPage
