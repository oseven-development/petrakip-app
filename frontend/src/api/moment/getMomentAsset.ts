import { Auth, Storage } from 'aws-amplify'
import { ContentType } from '../../API'
import { Media } from './saveMoment'

export const getMomentAsset = async ({
  key,
  contentType,
  content,
  owner,
}: {
  key: string
  contentType: ContentType
  content: string | undefined
  owner: string
}): Promise<Media> => {
  if (contentType === ContentType.text) {
    console.log(content)
    return {
      name: 'note',
      data: content,
      type: 'text',
    }
  } else {
    const currentUser = (await Auth.currentUserInfo()).username

    const result: any =
      owner === currentUser
        ? await Storage.get(key, {
            download: true,
            level: 'private',
          })
        : //TODO: add here Lambda call with s3 signed URL
          { Body: 'add here Lambda call with s3 signed URL', type: 'text' }
    return {
      // TODO: remove after signer url
      name: owner === currentUser ? key : 'note',
      data: result.Body,
      type: result.Body.type,
    }
  }
}
