import {
  ConfirmSignIn,
  RequireNewPassword,
  withAuthenticator,
} from 'aws-amplify-react'

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

import { albums, person, image, barChart } from 'ionicons/icons'

import { Redirect, Route } from 'react-router-dom'

import {
  MomentsListView,
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
import RegisterPage from './pages/login/registerPage'
import ConfirmSignUpPage from './pages/login/confirmSignUpPage'
import VerifyAccount from './pages/login/verifyAccount'
import ForgotPasswordPage from './pages/login/forgotPassword'

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/">
            <Redirect to="/moments" />
          </Route>
          {/* Moments routes  */}
          <Route exact path={'/moments'} component={MomentsListView} />
          <Route path={`/moments/details/:id`} component={MomentsDetailView} />
          <Route path={`/moments/create`} component={MomentsDetailView} />

          {/* Reflections routes */}
          <Route exact path={'/reflections'} component={ReflectionsListView} />
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
          <Route exact path={'/progress'} component={ProgressDetailView} />
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

// export default App
// TODO: https://docs.amplify.aws/lib/auth/customui/q/platform/js#customize-text-labels
export default withAuthenticator(App, false, [
  <LoginPage />,
  <RegisterPage />,
  <ConfirmSignIn />,
  <ConfirmSignUpPage />,
  <ForgotPasswordPage />,
  <RequireNewPassword />,
  <VerifyAccount />,
])
