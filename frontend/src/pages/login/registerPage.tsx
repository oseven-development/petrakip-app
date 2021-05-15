import React, { useState } from 'react'
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import AuthState from '../../model/authState'
import institutions from '../../data/institutions'
import './registerPage.css'

interface RegisterPageProps {
  setAuthState(authState: AuthState): void
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setAuthState }) => {
  const [forename, setForename] = useState('')
  const [surname, setSurname] = useState('')
  const [institution, setInstitution] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)

  const [registerLoading, setRegisterLoading] = useState(false)

  const customPopoverOptions = {
    header: 'Institution auswählen:',
    cssClass: 'institution-select',
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
        <div className="login-container">
          <h2>Name:</h2>
          <IonCard class="name-card">
            <IonCardContent>
              <IonItemGroup>
                <IonItem class="ion-no-padding">
                  <IonLabel position="stacked">Vorname</IonLabel>
                  <IonInput
                    autocomplete="name"
                    inputmode="text"
                    pattern="text"
                    placeholder="Vorname eingeben"
                    type="text"
                    value={forename}
                    onIonChange={e => setForename(e.detail.value ?? '')}
                  ></IonInput>
                </IonItem>
                <IonItem class="ion-no-padding">
                  <IonLabel position="stacked">Nachname</IonLabel>
                  <IonInput
                    autocomplete="family-name"
                    inputmode="text"
                    pattern="text"
                    placeholder="Nachname eingeben"
                    type="text"
                    value={surname}
                    onIonChange={e => setSurname(e.detail.value ?? '')}
                  ></IonInput>
                </IonItem>
              </IonItemGroup>
            </IonCardContent>
          </IonCard>

          <h2>Institution:</h2>
          <IonCard className="name-card">
            <IonCardContent>
              <IonItem class="ion-no-padding">
                <IonSelect
                  interfaceOptions={customPopoverOptions}
                  className="institution-select"
                  value={institution}
                  onIonChange={e => setInstitution(e.detail.value)}
                  interface="action-sheet"
                  placeholder="Institution auswählen"
                  cancelText="Abbrechen"
                  okText="Auswählen"
                >
                  {institutions.map((e, index) => (
                    <IonSelectOption
                      className="institution-select"
                      key={index}
                      value={e}
                    >
                      {e}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCardContent>
          </IonCard>

          <div className="terms">
            <IonCheckbox
              checked={agreedToTerms}
              onIonChange={e => setAgreedToTerms(e.detail.checked)}
            />
            <IonLabel>
              Hiermit bestätige ich, dass ich die{' '}
              <span
                className="terms-link"
                onClick={() => {
                  setShowTermsModal(true)
                }}
              >
                Terms and Conditions
              </span>{' '}
              gelesen und akzeptiert habe.
            </IonLabel>
          </div>

          <IonModal isOpen={showTermsModal}>
            <h1>Terms and Conditions</h1>
            <IonButton onClick={() => setShowTermsModal(false)}>
              Gelesen
            </IonButton>
          </IonModal>

          <IonButton
            disabled={!(forename && surname && institution && agreedToTerms)}
            expand="block"
            onClick={() => {
              console.log('Start clicked')
              setRegisterLoading(true)
              setTimeout(() => {
                setAuthState(AuthState.LoggedIn)
              }, 2000)
            }}
          >
            {registerLoading ? <IonSpinner /> : 'Los gehts'}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default RegisterPage
