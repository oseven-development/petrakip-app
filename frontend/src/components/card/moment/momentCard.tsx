import { AudioVariantProps, AudioVariantCardBody } from './audioVariantCardBody'
import { PropsCardWrapper, CardWrapper } from './cardWrapper'
import { ImageVariantProps, ImageVariantCardBody } from './imageVariantCardBody'
import { TextVariantProps, TextVariantCardBody } from './textVariantCardBody'
import { VideoVariantProps, VideoVariantCardBody } from './videoVariantCardBody'

export type Variant = 'text' | 'image' | 'audio' | 'video'

export interface DefaultProps extends Omit<PropsCardWrapper, 'children'> {
  variant: Variant
}

export type TextVariantWithProps = TextVariantProps & DefaultProps
export type ImageVariantWithProps = ImageVariantProps & DefaultProps
export type AudioVariantWithProps = AudioVariantProps & DefaultProps
export type VideoVariantWithProps = VideoVariantProps & DefaultProps

type Props =
  | TextVariantWithProps
  | ImageVariantWithProps
  | AudioVariantWithProps
  | VideoVariantWithProps

function Card(props: Props): JSX.Element {
  const { title, subtitle, momentId } = props

  return (
    <CardWrapper {...{ title, subtitle, momentId }}>
      {props.variant === 'text' && <TextVariantCardBody {...props} />}
      {props.variant === 'image' && <ImageVariantCardBody {...props} />}
      {props.variant === 'audio' && <AudioVariantCardBody {...props} />}
      {props.variant === 'video' && <VideoVariantCardBody {...props} />}
    </CardWrapper>
  )
}

export { Card as MomentCard }
