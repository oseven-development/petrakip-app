// import { withAuthenticator } from '@aws-amplify/ui-react'

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'

import { IonReactRouter } from '@ionic/react-router'
import Amplify from 'aws-amplify'

import { albums, person, image, barChart } from 'ionicons/icons'

import { Redirect, Route } from 'react-router-dom'

import awsExports from './aws-exports'
import {
  MomentsListView,
  MomentsCreateNewView,
  MomentsDetailView,
  ProgressDetailView,
  ReflectionsCreateNewView,
  ReflectionsDetailView,
  ReflectionsListView,
  ProfileDetailView,
  ProfileChangePasswordView,
} from './pages'

/* Core CSS required for Ionic components to work properly */

import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import LoginPage from './pages/login/loginPage'
import { useEffect, useState } from 'react'
import AuthState from './model/authState'
import RegisterPage from './pages/login/registerPage'
import { RegisterProvider } from './model/registerContext'
import ConfirmSignUpPage from './pages/login/confirmSignUpPage'

Amplify.configure(awsExports)

const App: React.FC = () => {
  const [authState, setAuthState] = useState(AuthState.LoggedOut)

  useEffect(() => {
    Amplify.Auth.currentAuthenticatedUser()
      .then((result: any) => {
        if (result.userConfirmed) {
          setAuthState(AuthState.LoggedIn)
        } else {
          setAuthState(AuthState.ConfirmSignUp)
        }
      })
      .catch(() => setAuthState(AuthState.LoggedOut))

    return () => {
      console.log('Finished with that')
    }
  }, [])

  // TODO: change to subscribe to the hub: https://docs.amplify.aws/lib/utilities/hub/q/platform/js

  switch (authState) {
    case AuthState.LoggedOut:
      return (
        <RegisterProvider>
          <LoginPage setAuthState={setAuthState} />
        </RegisterProvider>
      )
    case AuthState.Registering:
      return (
        <RegisterProvider>
          <RegisterPage setAuthState={setAuthState} />
        </RegisterProvider>
      )
    case AuthState.ConfirmSignUp:
      return (
        <RegisterProvider>
          <ConfirmSignUpPage />
        </RegisterProvider>
      )
    case AuthState.LoggedIn:
      return (
        <IonApp>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                {/* Moments routes  */}
                <Route exact path={'/moments'} component={MomentsListView} />
                <Route
                  path={`/moments/details/:id`}
                  component={MomentsDetailView}
                />
                <Route
                  path={`/moments/create`}
                  component={MomentsCreateNewView}
                />

                {/* Reflections routes */}
                <Route
                  exact
                  path={'/reflections'}
                  component={ReflectionsListView}
                />
                <Route
                  path={`/reflections/details/:id`}
                  component={ReflectionsDetailView}
                />
                <Route
                  path={`/reflections/create`}
                  component={ReflectionsCreateNewView}
                />

                {/* profile routes */}
                <Route exact path={'/profile'} component={ProfileDetailView} />
                <Route
                  path={`/profile/changepassword`}
                  component={ProfileChangePasswordView}
                />

                {/* progress routes */}
                <Route
                  exact
                  path={'/progress'}
                  component={ProgressDetailView}
                />

                {/* redirect from home */}
                <Route exact path={'/'}>
                  <Redirect to="/moments" />
                </Route>
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="moments" href="/moments">
                  <IonIcon icon={image} />
                  <IonLabel>Momente</IonLabel>
                </IonTabButton>
                <IonTabButton tab="reflections" href="/reflections">
                  <IonIcon icon={albums} />
                  <IonLabel>Reflexionen</IonLabel>
                </IonTabButton>
                <IonTabButton tab="profile" href="/profile">
                  <IonIcon icon={person} />
                  <IonLabel>Profil</IonLabel>
                </IonTabButton>
                <IonTabButton tab="progress" href="/progress">
                  <IonIcon icon={barChart} />
                  <IonLabel>Fortschritt</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </IonApp>
      )
  }
}

export default App
// TODO: https://docs.amplify.aws/lib/auth/customui/q/platform/js#customize-text-labels
// export default withAuthenticator(App)
