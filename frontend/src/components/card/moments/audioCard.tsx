import { PropsCardWrapper } from './cardWrapper'

export interface AudioVariant extends Omit<PropsCardWrapper, 'children'> {
  variant: 'audio'
  audio: string
}
export const AudioVariantCard: React.FC<AudioVariant> = props => <h1>Audio</h1>
