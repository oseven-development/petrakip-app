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
import { useHistory } from 'react-router-dom'
import Amplify from '@aws-amplify/core'

const LoginPage: React.FC = () => {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  const [loginLoading, setLoginLoading] = useState(false)

  const history = useHistory()

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
                /**
                 * TODO: Dummy solution for now
                 */
                console.log(`Trying to login with ${mail} and ${password}`)
                setLoginLoading(true)
                Amplify.Auth.signIn(mail, password)
                  .then((user: any) => {
                    setLoginLoading(false)
                    console.log(user)
                    if (user) {
                      history.push('/app/moments')
                    } else {
                      // TODO: unknown error
                    }
                  })
                  .catch((error: any) => {
                    // TODO: handle error
                    console.error(`Error occurred: `, error)
                    setLoginLoading(false)
                  })
              }}
            >
              {loginLoading ? <IonSpinner /> : 'Anmelden'}
            </IonButton>
            {/* TODO: set correct href to register page */}
            <IonButton expand="block" fill="outline" href="/app/tab2">
              Registrieren
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default LoginPage
