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
import { Header, LargeHeader } from '../../components/header'
import './login.css'

interface PageProps {
  mail: string
  codeSent: boolean
  confirmationCode: string
  newPassword: string
}

const ForgotPasswordView: React.FC = (props: any) => {
  const [pageProps, setPageProps] = useState<PageProps>({
    mail: '',
    codeSent: false,
    confirmationCode: '',
    newPassword: '',
  })
  const [presentToast] = useIonToast()

  if (props.authState !== 'forgotPassword') {
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

  const sendCode = () => {
    Auth.forgotPassword(pageProps.mail)
      .then(_ => {
        setPageProps({ ...pageProps, codeSent: true })
      })
      .catch(error => showError(error?.message))
  }

  const confirmNewPassword = () => {
    Auth.forgotPasswordSubmit(
      pageProps.mail,
      pageProps.confirmationCode,
      pageProps.newPassword,
    )
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
      <Header>Metapholio</Header>
      <IonContent>
        <LargeHeader>Metapholio</LargeHeader>
        <div className="container">
          <h2>Passwort zurücksetzen</h2>
          {pageProps.codeSent ? (
            <>
              <p>
                Passwort für <strong>{pageProps.mail}</strong> zurücksetzen
              </p>
              <IonItem class="ion-no-padding">
                <IonLabel position="stacked">Bestätigungscode</IonLabel>
                <IonInput
                  placeholder="Bestätigungscode eingeben"
                  type="number"
                  value={pageProps.confirmationCode}
                  onIonChange={e =>
                    setPageProps({
                      ...pageProps,
                      confirmationCode: e.detail.value ?? '',
                    })
                  }
                ></IonInput>
              </IonItem>
              <IonItem class="ion-no-padding">
                <IonLabel position="stacked">Passwort</IonLabel>
                <IonInput
                  pattern="password"
                  placeholder="Passwort eingeben"
                  type="password"
                  value={pageProps.newPassword}
                  onIonChange={e =>
                    setPageProps({
                      ...pageProps,
                      newPassword: e.detail.value ?? '',
                    })
                  }
                ></IonInput>
              </IonItem>
              <IonButton
                disabled={
                  !(
                    pageProps.mail &&
                    pageProps.confirmationCode &&
                    pageProps.newPassword
                  )
                }
                expand="block"
                fill="solid"
                onClick={confirmNewPassword}
              >
                Bestätigen
              </IonButton>
              <IonButton
                expand="block"
                fill="clear"
                size="small"
                onClick={sendCode}
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
                      value={pageProps.mail}
                      onIonChange={e =>
                        setPageProps({
                          ...pageProps,
                          mail: e.detail.value ?? '',
                        })
                      }
                    ></IonInput>
                  </IonItem>
                </IonCardContent>
              </IonCard>
              <IonButton
                disabled={!pageProps.mail}
                expand="block"
                onClick={sendCode}
              >
                Code senden
              </IonButton>
              <IonButton
                expand="block"
                fill="clear"
                size="small"
                onClick={backToSignIn}
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

export { ForgotPasswordView }
