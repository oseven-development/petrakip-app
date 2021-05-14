export interface VideoVariant {
  variant: 'video'
  videoSrc: string
}
export const VideoVariantCard: React.FC<VideoVariant> = props => (
  <video width="100%" controls>
    <source
      src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
      type="video/mp4"
    />
    {/* <source src="movie.ogg" type="video/ogg" /> */}
    Your browser does not support the video tag.
  </video>
)
