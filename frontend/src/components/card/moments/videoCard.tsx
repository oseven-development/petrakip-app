import { PropsCardWrapper } from './cardWrapper'

export interface VideoVariant extends Omit<PropsCardWrapper, 'children'> {
  variant: 'video'
  video: string
}
export const VideoVariantCard: React.FC<VideoVariant> = props => <h1>Video</h1>
