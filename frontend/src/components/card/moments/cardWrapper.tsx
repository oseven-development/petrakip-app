import {
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonCardHeader,
  IonCard,
  IonButton,
  IonIcon,
} from '@ionic/react'

import { star, trash, share } from 'ionicons/icons'

export interface PropsCardWrapper {
  title: string
  subtitle?: string
  children?: (false | JSX.Element)[] | JSX.Element
}

export const CardWrapper = ({
  children,
  title,
  subtitle,
}: PropsCardWrapper) => (
  <IonCard>
    <IonCardHeader>
      <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      <IonCardTitle>{title}</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      {children}
      <IonButton color="transparent" size="small" fill="clear">
        <IonIcon slot="icon-only" color="secondary" icon={star} />
      </IonButton>
      <IonButton color="transparent" size="small" fill="clear">
        <IonIcon slot="icon-only" color="secondary" icon={share} />
      </IonButton>
      <IonButton color="transparent" size="small" fill="clear">
        <IonIcon slot="icon-only" color="secondary" icon={trash} />
      </IonButton>
    </IonCardContent>
  </IonCard>
)
