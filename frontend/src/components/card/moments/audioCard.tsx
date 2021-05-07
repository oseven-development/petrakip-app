export interface AudioVariant {
  variant: 'audio'
  audio: string
}
export const AudioVariantCard: React.FC<AudioVariant> = props => <h1>Audio</h1>
