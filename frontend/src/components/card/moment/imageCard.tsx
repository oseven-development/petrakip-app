import { IonImg } from '@ionic/react'

export interface ImageVariant {
  variant: 'image'
  imageSrc: string
}
export const ImageVariantCard: React.FC<ImageVariant> = props => (
  <IonImg src="http://placekitten.com/g/400/200" />
)
