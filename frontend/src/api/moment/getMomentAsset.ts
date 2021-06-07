import { Storage } from 'aws-amplify'
import { ContentType } from '../../API'
import { Media } from './saveMoment'

export const getMomentAsset = async (
  key: string,
  contentType: ContentType,
  content: string | undefined,
): Promise<Media> => {
  if (contentType === ContentType.text) {
    return {
      name: 'note',
      data: content,
      type: 'text',
    }
  } else {
    const result: any = await Storage.get(key, {
      download: true,
      level: 'private',
    })
    return { name: key, data: result.Body, type: result.Body.type }
  }
}
