import { API, Auth, graphqlOperation, Storage } from 'aws-amplify'
import { S3Object } from '../../API'
import { createSignedUrlForAssets } from '../../graphql/queries'
import { Media } from './saveMoment'

export const getMomentAsset = async ({
  asset,
  content,
  owner,
}: {
  asset?: S3Object | null
  content?: string | null
  owner: string
}): Promise<Media> => {
  if (asset) {
    const currentUser = (await Auth.currentUserInfo()).username

    const result: any =
      owner === currentUser
        ? await Storage.get(asset.key, {
            download: true,
            level: 'private',
          })
        : await getSharedAsset(asset)
    return {
      name: asset.key,
      data: result.Body,
      type: result.Body.type,
    }
  }
  return {
    name: 'note',
    data: content,
    type: 'text',
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
