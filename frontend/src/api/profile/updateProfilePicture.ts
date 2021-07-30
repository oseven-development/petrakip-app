import { API, graphqlOperation, Storage } from 'aws-amplify'
import {
  CreateMomentInput,
  CreateProfileSettingsInput,
  Moment,
  UpdateMomentInput,
  UpdateProfileSettingsInput,
} from '../../API'
import awsExports from '../../aws-exports'
import {
  createMoment,
  createProfileSettings,
  updateMoment,
  updateProfileSettings,
} from '../../graphql/mutations'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { getContentTypeFromMimeType } from '../../utils/getContentTypeUtils'
import { Credentials } from '@aws-amplify/core'
import { extension } from 'mime-types'
import { listProfileSettingss } from '../../graphql/queries'

// Can't use Moment from API.ts due to __typename
export interface Media {
  name: string
  // @TODO Fix any
  data: File | string | any
  type: string
}

export interface s3MetaData {
  key: string
}

export const updateProfilePictureAPI = async (media: Media) => {
  try {
    const result: any = await API.graphql(
      graphqlOperation(listProfileSettingss),
    )
    const updateState =
      result.data.listProfileSettingss.items.length > 0 ? 'update' : 'create'

    const profileInput: CreateProfileSettingsInput = {}
    const fileExtension = extension(media.type)
    const mediaAssetKey = `profile/profile_picture.${fileExtension}`

    const s3MetaData = (await Storage.put(mediaAssetKey, media.data, {
      contentType: media.type,
      level: 'private',
    })) as s3MetaData

    profileInput.profilePicture = {
      bucket: awsExports.aws_user_files_s3_bucket,
      region: awsExports.aws_user_files_s3_bucket_region,
      key: s3MetaData.key,
    }
    // update or create new moment
    if (updateState === 'create') {
      const res = (await API.graphql(
        graphqlOperation(createProfileSettings, { input: profileInput }),
      )) as GraphQLResult<{ createProfileSettings: CreateProfileSettingsInput }>

      return res.data?.createProfileSettings
    } else if (updateState === 'update') {
      profileInput.id = result.data.listProfileSettingss.items[0].id
      const res: any = (await API.graphql(
        graphqlOperation(updateProfileSettings, { input: profileInput }),
      )) as GraphQLResult<{ updateProfileSettings: UpdateProfileSettingsInput }>
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
