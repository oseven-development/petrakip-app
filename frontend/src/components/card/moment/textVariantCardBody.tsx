import { IonText } from '@ionic/react'

export interface TextVariantProps {
  variant: 'text'
  text: string
}
export const TextVariantCardBody: React.FC<TextVariantProps> = ({ text }) => (
  <IonText>{text}</IonText>
)
