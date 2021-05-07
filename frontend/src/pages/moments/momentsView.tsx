import { IonRouterOutlet } from '@ionic/react'
import { Route, RouteComponentProps } from '@ionic/react-router'

import { MomentsCreateNewView } from './momentsCreateNewView'
import { MomentDetailView } from './momentsDetailView'
import { MomentsListView } from './momentsListView'

export const MomentsView: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonRouterOutlet>
      <Route exact path={match.url} component={MomentsListView} />
      <Route path={`${match.url}/:id`} component={MomentDetailView} />
      <Route path={`${match.url}/create`} component={MomentsCreateNewView} />
    </IonRouterOutlet>
  )
}
