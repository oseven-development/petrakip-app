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

import { Route } from 'react-router-dom'

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
import InitialLoadingView from './components/initialLoadingView'

Amplify.configure(awsExports)

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <InitialLoadingView loginPath="/login" appPath="/app/moments" />
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/app">
          <IonTabs>
            <IonRouterOutlet>
              {/* Moments routes  */}
              <Route exact path={'/app/moments'} component={MomentsListView} />
              <Route
                path={`/app/moments/details/:id`}
                component={MomentsDetailView}
              />
              <Route
                path={`/app/moments/create`}
                component={MomentsCreateNewView}
              />

              {/* Reflections routes */}
              <Route
                exact
                path={'/app/reflections'}
                component={ReflectionsListView}
              />
              <Route
                path={`/app/reflections/details/:id`}
                component={ReflectionsDetailView}
              />
              <Route
                path={`/app/reflections/create`}
                component={ReflectionsCreateNewView}
              />

              {/* profile routes */}
              <Route
                exact
                path={'/app/profile'}
                component={ProfileDetailView}
              />
              <Route
                path={`/app/profile/changepassword`}
                component={ProfileChangePasswordView}
              />

              {/* progress routes */}
              <Route
                exact
                path={'/app/progress'}
                component={ProgressDetailView}
              />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="moments" href="/app/moments">
                <IonIcon icon={image} />
                <IonLabel>Momente</IonLabel>
              </IonTabButton>
              <IonTabButton tab="reflections" href="/app/reflections">
                <IonIcon icon={albums} />
                <IonLabel>Reflexionen</IonLabel>
              </IonTabButton>
              <IonTabButton tab="profile" href="/app/profile">
                <IonIcon icon={person} />
                <IonLabel>Profil</IonLabel>
              </IonTabButton>
              <IonTabButton tab="progress" href="/app/progress">
                <IonIcon icon={barChart} />
                <IonLabel>Fortschritt</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
)

export default App
// TODO: https://docs.amplify.aws/lib/auth/customui/q/platform/js#customize-text-labels
// export default withAuthenticator(App)
