import { IonContent, IonPage, IonSpinner } from '@ionic/react'
import Amplify from 'aws-amplify'
import React from 'react'
import { useHistory } from 'react-router-dom'

interface InitialLoadingViewProps {
  loginPath: string
  appPath: string
}

const InitialLoadingView: React.FC<InitialLoadingViewProps> = ({
  loginPath,
  appPath,
}) => {
  const history = useHistory()

  setTimeout(() => {
    Amplify.Auth.currentAuthenticatedUser()
      .then(() => history.push(appPath))
      .catch(() => history.push(loginPath))
  }, 2000)

  return (
    <IonPage>
      <IonContent>
        <IonSpinner />
      </IonContent>
    </IonPage>
  )
}

export default InitialLoadingView
