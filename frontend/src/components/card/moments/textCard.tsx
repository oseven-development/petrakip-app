export interface TextVariant {
  variant: 'text'
  text: string
}
export const TextVariantCard: React.FC<TextVariant> = props => <h1>Text</h1>
