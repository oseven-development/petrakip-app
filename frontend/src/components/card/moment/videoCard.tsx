export interface VideoVariant {
  variant: 'video'
  videoSrc: string
}

export const VideoVariantCard: React.FC<VideoVariant> = ({ videoSrc }) => (
  <video width="100%" controls>
    <source src={videoSrc} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
)
