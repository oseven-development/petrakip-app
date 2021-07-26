import React, { useState } from 'react'
import {
  IonButton,
  IonButtons,
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
  useIonToast,
} from '@ionic/react'
import { institutions } from '../../data/institutions'
import './login.css'
import Auth from '@aws-amplify/auth'
import { LargeHeader } from '../../components/header'

interface UserProps {
  mail: string
  password: string
  forename: string
  surname: string
  institution: string
  agreedToTerms: boolean
}

const RegisterView: React.FC = ({ authState, onStateChange }: any) => {
  const [userProps, setUserProps] = useState<UserProps>({
    mail: '',
    password: '',
    forename: '',
    surname: '',
    institution: '',
    agreedToTerms: false,
  })
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)

  const [presentToast] = useIonToast()

  const customPopoverOptions = {
    header: 'Institution auswählen:',
    cssClass: 'institution-select',
  }

  const confirmSignUp = (result: any) => {
    /**
     * Object is of type ISignUpResult and has:
     * user: CognitoUser
     * userConfirmed: boolean
     * userSub: string
     */
    setRegisterLoading(false)
    onStateChange('confirmSignUp')
  }

  const signUp = () => {
    setRegisterLoading(true)

    Auth.signUp({
      username: userProps.mail,
      password: userProps.password,
      attributes: {
        name: userProps.forename,
        family_name: userProps.surname,
        email: userProps.mail,
        preferred_username: userProps.institution,
      },
    })
      .then(confirmSignUp)
      .catch(error => {
        presentToast(
          `Fehler: ${
            error?.message || 'Bitte versuche es später noch einmal.'
          }`,
          2000,
        )
        setRegisterLoading(false)
      })
  }

  return (
    <>
      {authState !== 'signUp' ? null : (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton
                  color="primary"
                  onClick={() => {
                    onStateChange('signIn')
                  }}
                >
                  Zurück
                </IonButton>
              </IonButtons>
              <IonTitle slot="primary">Metapholio</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <LargeHeader>Metapholio</LargeHeader>
            <div className="container">
              <h2>Logindaten:</h2>
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
                      value={userProps.mail}
                      onIonChange={e =>
                        setUserProps({
                          ...userProps,
                          mail: e.detail.value ?? '',
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
                      value={userProps.password}
                      onIonChange={e =>
                        setUserProps({
                          ...userProps,
                          password: e.detail.value ?? '',
                        })
                      }
                    ></IonInput>
                  </IonItem>
                </IonCardContent>
              </IonCard>
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
                        value={userProps.forename}
                        onIonChange={e =>
                          setUserProps({
                            ...userProps,
                            forename: e.detail.value ?? '',
                          })
                        }
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
                        value={userProps.surname}
                        onIonChange={e =>
                          setUserProps({
                            ...userProps,
                            surname: e.detail.value ?? '',
                          })
                        }
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
                      value={userProps.institution}
                      onIonChange={e =>
                        setUserProps({
                          ...userProps,
                          institution: e.detail.value,
                        })
                      }
                      interface="action-sheet"
                      placeholder="Institution auswählen"
                      cancelText="Abbrechen"
                      okText="Auswählen"
                    >
                      {institutions.map((institution, index) => (
                        <IonSelectOption
                          className="institution-select"
                          key={`institution-selection-${index}`}
                          value={institution}
                        >
                          {institution}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonCardContent>
              </IonCard>

              <div className="terms">
                <IonCheckbox
                  checked={userProps.agreedToTerms}
                  onIonChange={e =>
                    setUserProps({
                      ...userProps,
                      agreedToTerms: e.detail.checked,
                    })
                  }
                />
                <IonLabel>
                  Hiermit bestätige ich, dass ich die{' '}
                  <span
                    className="terms-link"
                    onClick={() => {
                      setShowTermsModal(true)
                    }}
                  >
                    AGBs
                  </span>{' '}
                  gelesen und akzeptiert habe.
                </IonLabel>
              </div>

              <IonModal isOpen={showTermsModal}>
                <h1>AGBs</h1>
                <IonButton onClick={() => setShowTermsModal(false)}>
                  Gelesen
                </IonButton>
              </IonModal>

              <IonButton
                disabled={
                  !(
                    userProps.mail &&
                    userProps.password &&
                    userProps.forename &&
                    userProps.surname &&
                    userProps.institution &&
                    userProps.agreedToTerms
                  )
                }
                expand="block"
                onClick={signUp}
              >
                {registerLoading ? <IonSpinner /> : 'Los gehts'}
              </IonButton>
            </div>
          </IonContent>
        </IonPage>
      )}
    </>
  )
}

export { RegisterView }
