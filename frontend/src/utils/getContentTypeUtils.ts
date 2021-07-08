import { ContentType } from '../API'
import { image, videocam, mic, text, helpCircle } from 'ionicons/icons'

export const getIconFromContentType = (
  contentType: ContentType | null | undefined,
) => {
  switch (contentType) {
    case ContentType.audio:
      return mic
    case ContentType.image:
      return image
    case ContentType.text:
      return text
    case ContentType.video:
      return videocam
    default:
      return helpCircle
  }
}

export const getContentTypeFromMimeType = (mimeType: string) => {
  if (mimeType.includes('audio')) {
    return ContentType.audio
  } else if (mimeType.includes('video')) {
    return ContentType.video
  } else if (mimeType.includes('image')) {
    return ContentType.image
  } else if (mimeType.includes('text')) {
    return ContentType.text
  } else {
    return undefined
  }
}
