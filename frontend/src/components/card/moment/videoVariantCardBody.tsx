export interface VideoVariantProps {
  variant: 'video'
  videoSrc: string
}

export const VideoVariantCardBody: React.FC<VideoVariantProps> = ({
  videoSrc,
}) => (
  <video width="100%" controls>
    <source src={videoSrc} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
)
