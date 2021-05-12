import {
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonCardHeader,
  IonCard,
  IonRouterLink,
} from '@ionic/react'

export interface PropsCardWrapper {
  title: string
  subtitle?: string
  momentId: number
  children?: (false | JSX.Element)[]
}

export const CardWrapper = ({
  children,
  title,
  subtitle,
  momentId,
}: PropsCardWrapper) => (
  <IonCard>
    <IonCardHeader>
      <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      <IonRouterLink routerLink={`/moments/details/${momentId}`}>
        <IonCardTitle>{title}</IonCardTitle>
      </IonRouterLink>
    </IonCardHeader>
    <IonCardContent>{children}</IonCardContent>
  </IonCard>
)
