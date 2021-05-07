import { PropsCardWrapper } from './cardWrapper'

export interface TextVariant extends Omit<PropsCardWrapper, 'children'> {
  variant: 'text'
  text: string
}
export const TextVariantCard: React.FC<TextVariant> = props => <h1>Text</h1>
