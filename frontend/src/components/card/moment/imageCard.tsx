import { IonImg } from '@ionic/react'

export interface ImageVariant {
  variant: 'image'
  imageSrc: string
}

export const ImageVariantCard: React.FC<ImageVariant> = ({ imageSrc }) => (
  <IonImg src={imageSrc} />
)
