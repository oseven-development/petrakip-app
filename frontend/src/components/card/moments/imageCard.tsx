export interface ImageVariant {
  variant: 'image'
  image: string
}
export const ImageVariantCard: React.FC<ImageVariant> = props => <h1>Image</h1>
