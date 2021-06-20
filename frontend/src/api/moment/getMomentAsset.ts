import { Auth, Storage } from 'aws-amplify'
import { ContentType } from '../../API'
import { Media } from './saveMoment'

export interface S3Object {
  bucket: string
  key: string
  region: string
  identityId: string
}

export const getMomentAsset = async ({
  asset,
  contentType,
  content,
  owner,
}: {
  asset: S3Object
  contentType: ContentType
  content: string | undefined
  owner: string
}): Promise<Media> => {
  if (contentType === ContentType.text) {
    return {
      name: 'note',
      data: content,
      type: 'text',
    }
  } else {
    const currentUser = (await Auth.currentUserInfo()).username

    const result: any =
      owner === currentUser
        ? await Storage.get(asset.key, {
            download: true,
            level: 'private',
          })
        : getSharedAsset(asset)
    return {
      // TODO: remove after signer url
      name: owner === currentUser ? asset.key : 'note',
      data: owner === currentUser ? asset.key : 'Not implemented yet',
      type: owner === currentUser ? result.Body.type : 'text',
    }
  }
}

export const getSharedAsset = async (asset: S3Object) => {
  const completeKey = `private/${asset.identityId}/${asset.key}`

  // TODO: Add lambda call for signed URL -> {bucket: asset.bucket, key:completeKey}
  // docs https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html

  //
  return {}
}
