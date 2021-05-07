import { PropsCardWrapper } from './cardWrapper'

export interface ImageVariant extends Omit<PropsCardWrapper, 'children'> {
  variant: 'image'
  image: string
}
export const ImageVariantCard: React.FC<ImageVariant> = props => <h1>Image</h1>
