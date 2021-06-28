// import Auth from '@aws-amplify/auth'
// import {
//   IonButton,
//   IonContent,
//   IonInput,
//   IonItem,
//   IonLabel,
//   IonPage,
//   useIonToast,
// } from '@ionic/react'
import React, { useEffect, useState } from 'react'
// import { Header, LargeHeader } from '../../components/header'
import './login.css'

const VerifyAccountView: React.FC = (props: any) => {
  // const [codeSent, setCodeSent] = useState(false)
  // const [confirmationCode, setConfirmationCode] = useState('')
  // const [presentToast] = useIonToast()

  // useEffect(() => {
  //   if (props.authState === 'verifyContact' && !codeSent) {
  //     Auth.verifyCurrentUserAttribute('email')
  //       .then(_ => setCodeSent(true))
  //       .catch(error => showError(error?.message))
  //   }
  // })

  useEffect(() => {
    if (props.authState === 'verifyContact') {
      props.onStateChange('signedIn')
    }
  })

  // if (props.authState !== 'verifyContact') {
  //   return null
  // }

  // const showError = (message?: string) => {
  //   presentToast(
  //     `Fehler: ${
  //       message ||
  //       'Etwas ist schiefgelaufen, bitte versuchen Sie es später noch einmal!'
  //     }`,
  //     2000,
  //   )
  // }

  // const verifyContact = () => {
  //   Auth.verifyCurrentUserAttributeSubmit('email', confirmationCode)
  //     .then(_ => {
  //       props.onStateChange('signedIn')
  //     })
  //     .catch(error => showError(error?.message))
  // }

  return (
    <>
      {/* {props.authState !== 'verifyContact' ? null : (
        <IonPage>
          <Header>Metapholio</Header>
          <IonContent>
            <LargeHeader>Metapholio</LargeHeader>
            <div className="container">
              <h2>Verifizieren des Accounts THTTT</h2>
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
                // onClick={verifyContact}
              >
                Verifizieren
              </IonButton>
            </div>
          </IonContent>
        </IonPage>
      )} */}
    </>
  )
}

export { VerifyAccountView }
