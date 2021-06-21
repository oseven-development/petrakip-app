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
    console.log(result)
    return {
      name: asset.key,
      data: result.Body,
      type: result.Body.type,
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
    try {
      const blob = await (await fetch(res.data.createSignedUrlForAssets)).blob()
      return { Body: blob }
    } catch (error) {
      throw error
    }
  } else {
    console.error(res.data.errors[0].message)
    throw new Error(res.data.errors[0].message)
  }
}
