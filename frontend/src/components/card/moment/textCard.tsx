import { IonText } from '@ionic/react'

export interface TextVariant {
  variant: 'text'
  text: string
}
export const TextVariantCard: React.FC<TextVariant> = ({ text }) => (
  <IonText>{text}</IonText>
)
