import { withAuthenticator } from '@aws-amplify/ui-react'

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
  MomentsView,
  ProfileView,
  ReflectionsView,
  ProgressView,
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

Amplify.configure(awsExports)

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route
            path="/dashboard"
            render={props => <MomentsView {...props} />}
          />
          <Route exact path="/reflections">
            <ReflectionsView />
          </Route>
          <Route path="/profile">
            <ProfileView />
          </Route>
          <Route path="/progress">
            <ProgressView />
          </Route>
          <Route exact path="/" render={() => <Redirect to="/moments" />} />
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
export default withAuthenticator(App)
