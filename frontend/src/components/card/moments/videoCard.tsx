export interface VideoVariant {
  variant: 'video'
  video: string
}
export const VideoVariantCard: React.FC<VideoVariant> = props => <h1>Video</h1>
