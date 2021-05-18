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
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useRegister } from '../../model/registerContext'

const ConfirmSignUpPage: React.FC = () => {
  const [mail, setMail] = useState('')
  const [confirmationCode, setConfirmationCode] = useState('')

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
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ConfirmSignUpPage
