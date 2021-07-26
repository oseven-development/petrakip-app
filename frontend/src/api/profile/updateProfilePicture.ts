import { API, graphqlOperation, Storage } from 'aws-amplify'
import { CreateMomentInput, CreateProfileSettingsInput, Moment, UpdateMomentInput, UpdateProfileSettingsInput } from '../../API'
import awsExports from '../../aws-exports'
import { createMoment, createProfileSettings, updateMoment, updateProfileSettings } from '../../graphql/mutations'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { getContentTypeFromMimeType } from '../../utils/getContentTypeUtils'
import { Credentials } from '@aws-amplify/core'
import { extension } from 'mime-types'

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

export const updateProfilePictureAPI = async ({
  profile,
  media,
}: {
  profile: CreateProfileSettingsInput
  media: Media
}) => {
  try {
    const updateState = profile.profilePicture ? 'update' : 'create'

    const fileExtension = extension(media.type)
    const mediaAssetKey = `profile/profile_picture.${fileExtension}`
    const s3MetaData = (await Storage.put(mediaAssetKey, media.data, {
      contentType: media.type,
      level: 'private',
    })) as s3MetaData

    profile.profilePicture = {
      bucket: awsExports.aws_user_files_s3_bucket,
      region: awsExports.aws_user_files_s3_bucket_region,
      key: s3MetaData.key,
    }

       // update or create new moment
    if (updateState === 'create') {
      const res = (await API.graphql(
        graphqlOperation(createProfileSettings, { input: profile }),
      )) as GraphQLResult<{ createProfileSettings: CreateProfileSettingsInput }>

      return res.data?.createProfileSettings
    } else if (updateState === 'update') {


      const res: any = (await API.graphql(
        graphqlOperation(updateProfileSettings, { input: profile }),
      )) as GraphQLResult<{ updateProfileSettings: UpdateProfileSettingsInput }>

  } catch (error) {
    console.error(error)
    throw error
  }
}
