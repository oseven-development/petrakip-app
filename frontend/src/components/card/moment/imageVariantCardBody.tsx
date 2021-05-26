import { IonImg } from '@ionic/react'

export interface ImageVariantProps {
  variant: 'image'
  imageSrc: string
}

export const ImageVariantCardBody: React.FC<ImageVariantProps> = ({
  imageSrc,
}) => <IonImg src={imageSrc} />
