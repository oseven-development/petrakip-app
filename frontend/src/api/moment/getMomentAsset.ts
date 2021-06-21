import { API, Auth, graphqlOperation, Storage } from 'aws-amplify'
import { ContentType } from '../../API'
import { createSignedUrlForAssets } from '../../graphql/queries'
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
        : await getSharedAsset(asset)
    return {
      // TODO: remove after signer url
      name: owner === currentUser ? asset.key : 'note',
      data: owner === currentUser ? result.Body : 'Not implemented yet',
      type: owner === currentUser ? result.Body.type : 'text',
    }
  }
}

export const getSharedAsset = async (asset: S3Object) => {
  const completeKey = `private/${asset.identityId}/${asset.key}`

  const res: any = await API.graphql(
    graphqlOperation(createSignedUrlForAssets, {
      bucket: asset.bucket,
      key: completeKey,
    }),
  )

  if (res.data.createSignedUrlForAssets) {
    // TODO: add fetch request for file

    return res.data.createSignedUrlForAssets
  } else {
    console.error(res.data.errors[0].message)
    throw new Error(res.data.errors[0].message)
  }
}
