import { AudioVariant, AudioVariantCard } from './audioCard'
import { PropsCardWrapper, CardWrapper } from './cardWrapper'
import { ImageVariant, ImageVariantCard } from './imageCard'
import { TextVariant, TextVariantCard } from './textCard'
import { VideoVariant, VideoVariantCard } from './videoCard'

export type Variant = 'text' | 'image' | 'video' | 'audio'

export interface DefaultProps extends Omit<PropsCardWrapper, 'children'> {
  variant: Variant
  momentId: number
}

type TextVariantWithProps = TextVariant & DefaultProps
type ImageVariantWithProps = ImageVariant & DefaultProps
type AudioVariantWithProps = AudioVariant & DefaultProps
type VideoVariantWithProps = VideoVariant & DefaultProps

type Props =
  | TextVariantWithProps
  | ImageVariantWithProps
  | AudioVariantWithProps
  | VideoVariantWithProps

function Card(props: TextVariantWithProps): JSX.Element
function Card(props: ImageVariantWithProps): JSX.Element
function Card(props: AudioVariantWithProps): JSX.Element
function Card(props: VideoVariantWithProps): JSX.Element
function Card(props: Props): JSX.Element {
  const { title, subtitle, momentId } = props

  return (
    <CardWrapper {...{ title, subtitle, momentId }}>
      {props.variant === 'text' && <TextVariantCard {...props} />}
      {props.variant === 'image' && <ImageVariantCard {...props} />}
      {props.variant === 'audio' && <AudioVariantCard {...props} />}
      {props.variant === 'video' && <VideoVariantCard {...props} />}
    </CardWrapper>
  )
}

export { Card as MomentCard }
