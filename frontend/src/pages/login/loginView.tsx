import React, { useState } from 'react'
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonNav,
  IonPage,
  IonSpinner,
  useIonToast,
} from '@ionic/react'

import './login.css'
import Amplify from '@aws-amplify/core'
import { Header, LargeHeader } from '../../components'
import { Auth } from 'aws-amplify'

const LoginView: React.FC = (props: any) => {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [presentToast] = useIonToast()

  const [rememberMe, setRememberMe] = React.useState(true)

  const [loginLoading, setLoginLoading] = useState(false)

  React.useEffect(() => {
    Auth.configure({
      storage: rememberMe ? window.localStorage : window.sessionStorage,
    })
  }, [rememberMe])

  if (props.authState !== 'signIn') {
    return null
  }

  const showError = (message?: string) => {
    presentToast(
      `Fehler: ${
        message ||
        'Etwas ist schiefgelaufen, bitte versuche es später noch einmal!'
      }`,
      2000,
    )
  }

  const tryLogin = () => {
    setLoginLoading(true)
    Amplify.Auth.signIn(mail, password)
      .then((_: any) => {
        setLoginLoading(false)
      })
      .catch((error: any) => {
        if (error.code === 'UserNotConfirmedException') {
          props.onStateChange('confirmSignUp', props.authData)
        }
        showError(error.message)
        console.error('[LoginPage] catch: ', error)
        setLoginLoading(false)
      })
  }

  const registerClicked = () => {
    props.onStateChange('signUp')
  }

  return (
    <IonPage>
      <Header>Metapholio</Header>
      <IonContent>
        <IonNav>
          <LargeHeader>Metapholio</LargeHeader>
          <div className="container">
            <p>Willkommen bei Metapholio, bitte melde dich an:</p>

            <IonItem>
              <IonLabel>
                Anmeldung wird {rememberMe ? '' : 'nicht'} gespeichert
              </IonLabel>
              <IonCheckbox
                slot="end"
                checked={rememberMe}
                onClick={() => {
                  setRememberMe(v => !v)
                }}
              />
            </IonItem>

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
                onClick={tryLogin}
              >
                {loginLoading ? <IonSpinner /> : 'Anmelden'}
              </IonButton>
              <IonButton
                expand="block"
                fill="outline"
                onClick={registerClicked}
              >
                Registrieren
              </IonButton>
              <IonButton
                expand="block"
                fill="clear"
                size="small"
                disabled={!mail}
                onClick={() => props.onStateChange('forgotPassword')}
              >
                Passwort vergessen
              </IonButton>
            </div>
          </div>
        </IonNav>
      </IonContent>
    </IonPage>
  )
}

export { LoginView }
