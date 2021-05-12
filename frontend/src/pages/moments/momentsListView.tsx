import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonButton,
  IonListHeader,
  IonText,
  IonRouterLink,
  IonItemDivider,
} from '@ionic/react'
import { Header, MomentCard } from '../../components'
import { RouteComponentProps } from 'react-router'

import { API, graphqlOperation } from 'aws-amplify'
import { listMoments } from '../../graphql/queries'

import {
  TextVariantWithProps,
  ImageVariantWithProps,
  AudioVariantWithProps,
  VideoVariantWithProps,
} from '../../components/card/moments/basicCard'
import React from 'react'

interface Props extends RouteComponentProps<{}> {}

const data: {
  date: string
  dataset: (
    | TextVariantWithProps
    | ImageVariantWithProps
    | AudioVariantWithProps
    | VideoVariantWithProps
  )[]
}[] = [
  {
    date: '24.04.2021 Mittwoch',
    dataset: [
      {
        momentId: 1,
        title: 'Text Card',
        variant: 'text',
        text: 'asd',
      },
      {
        momentId: 1,
        title: 'Text Card',
        variant: 'image',
        image: 'asd',
      },
      {
        momentId: 1,
        title: 'Text Card',
        variant: 'audio',
        audio: 'asd',
      },
      {
        momentId: 1,
        title: 'Text Card',
        variant: 'video',
        video: 'asd',
      },
    ],
  },
  {
    date: '23.04.2021 Dienstag',
    dataset: [
      {
        momentId: 1,
        title: 'Text Card',
        variant: 'text',
        text: 'asd',
      },
      {
        momentId: 1,
        title: 'Text Card',
        variant: 'image',
        image: 'asd',
      },
      {
        momentId: 1,
        title: 'Text Card',
        variant: 'audio',
        audio: 'asd',
      },
      {
        momentId: 1,
        title: 'Text Card',
        variant: 'video',
        video: 'asd',
      },
    ],
  },
]

export const MomentsListView: React.FC<Props> = ({ history }) => {
  React.useEffect(() => {
    const fetch = async () => {
      const x = await API.graphql(graphqlOperation(listMoments))
      console.log(x)
    }
    fetch()
  }, [])

  return (
    <IonPage>
      <Header>Momente List View</Header>
      <IonContent fullscreen>
        <IonButton routerLink="/moments/create" color="primary">
          Erstellen
        </IonButton>
        <br></br>
        {data.map((daily, indexDay) => (
          <React.Fragment key={`daily-moments-${indexDay}`}>
            <IonLabel className="ion-padding-start" color="medium">
              {daily.date}
            </IonLabel>
            {daily.dataset.map((cardDataset, indexCard) => (
              <MomentCard
                key={`daily-moments-${indexDay}-card-${indexCard}`}
                {...cardDataset}
              />
            ))}
          </React.Fragment>
        ))}
      </IonContent>
    </IonPage>
  )
}
