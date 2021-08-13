import { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
  IonProgressBar,
  useIonViewWillEnter,
} from '@ionic/react'

import { Header, LargeHeader } from '../../components'
import { listAllReflectionsAPI } from '../../api/'
import { Reflection, ReflectionState } from '../../API'

interface Props extends RouteComponentProps<{}> {}

export const ProgressDetailView: React.FC<Props> = ({ history }) => {
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [completedReflections, setCompletedReflections] = useState<number>(0)
  useIonViewWillEnter(() => {
    listAllReflectionsAPI()
      .then(res => {
        setReflections(res)
        setCompletedReflections(
          res.filter(({ state }) => state === ReflectionState.completed).length,
        )
      })
      .catch(console.error)
  }, [])
  return (
    <IonPage>
      <Header>Fortschritt</Header>
      <IonContent fullscreen>
        <LargeHeader>Fortschritt</LargeHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Reflektionen</IonCardSubtitle>
            <IonCardTitle>
              {completedReflections} / {reflections.length} abgeschlossen
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <br />
            <IonProgressBar
              color="primary"
              value={
                completedReflections === 0
                  ? 0
                  : completedReflections / reflections.length
              }
            ></IonProgressBar>
            <br />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}
