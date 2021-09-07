import React from 'react'
import { Auth } from 'aws-amplify'
import { RouteComponentProps } from 'react-router-dom'

import { checkmarkCircleOutline, checkmarkCircle } from 'ionicons/icons'
import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
} from '@ionic/react'
import { Header } from '../../components'

const CheckmarkStateIcon: React.FC<{ state: string | null | undefined }> = ({
  state,
}) => (
  <IonIcon
    icon={state !== '' ? checkmarkCircle : checkmarkCircleOutline}
    color={state !== '' ? 'success' : 'medium'}
    slot="end"
  />
)

interface Props extends RouteComponentProps<{}> {}

export const ProfileChangePasswordView: React.FC<Props> = ({ history }) => {
  const [state, setState] = React.useState({
    oldPassword: '',
    newPassword: '',
    newPasswordVerify: '',
  })

  const changePassword = () => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, state.oldPassword, state.newPassword)
      })
      .catch(err => console.error(err))
  }
  return (
    <IonPage>
      <Header>Password ändern</Header>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonItem>
                  <IonInput
                    type="password"
                    placeholder="aktuelles Password"
                    value={state.oldPassword}
                    onIonChange={e => {
                      setState(s => ({ ...s, oldPassword: e.detail.value! }))
                    }}
                  ></IonInput>
                  <IonLabel></IonLabel>
                  <CheckmarkStateIcon state={state.oldPassword} />
                </IonItem>

                <IonItem>
                  <IonInput
                    type="password"
                    placeholder="neues Password"
                    value={state.newPassword}
                    onIonChange={e => {
                      setState(s => ({ ...s, newPassword: e.detail.value! }))
                    }}
                  ></IonInput>
                  <IonLabel>{state.newPassword.length}</IonLabel>
                  <CheckmarkStateIcon state={state.newPassword} />
                </IonItem>

                <IonItem>
                  <IonInput
                    type="password"
                    placeholder="neues Password wiederholen"
                    value={state.newPasswordVerify}
                    onIonChange={e => {
                      setState(s => ({
                        ...s,
                        newPasswordVerify: e.detail.value!,
                      }))
                    }}
                  ></IonInput>
                  <IonLabel>{state.newPasswordVerify.length}</IonLabel>
                  <CheckmarkStateIcon
                    state={
                      state.newPassword === state.newPasswordVerify &&
                      state.newPasswordVerify !== ''
                        ? 'true'
                        : ''
                    }
                  />
                </IonItem>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonButton
          expand="block"
          fill="outline"
          disabled={
            state.newPassword === '' ||
            state.oldPassword === '' ||
            state.newPassword !== state.newPasswordVerify
          }
          onClick={changePassword}
        >
          Passwort ändern!
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
