import { API, graphqlOperation, Storage } from 'aws-amplify'
import {
  CreateProfileSettingsInput,
  UpdateProfileSettingsInput,
} from '../../API'
import {
  createProfileSettings,
  updateProfileSettings,
} from '../../graphql/mutations'
import { listProfileSettingss } from '../../graphql/queries'
import { createDataExportForUser } from '../../graphql/queries'
import { Credentials } from '@aws-amplify/core'

export interface ProfileSettings {
  picture?: {
    name: string
    data: any
    type: any
  }
  settings?: any
}

export const exportAllDataAPI = async () => {
  try {
    const userKey = `private/${(await Credentials.get()).identityId}`

    const exportLambda: any = await API.graphql(
      graphqlOperation(createDataExportForUser, {
        userKey,
      }),
    )

    // get profile Settings of User
    const profileSettings: any = await API.graphql(
      graphqlOperation(listProfileSettingss),
    )
    //  create updateProfileInput
    if (profileSettings.data.listProfileSettingss.items.length > 0) {
      const updateProfileInput: UpdateProfileSettingsInput = {
        id: profileSettings.data.listProfileSettingss.items[0].id,
        latestExportKey: exportLambda.data.createDataExportForUser,
      }
      // update profile with latest export
      await API.graphql(
        graphqlOperation(updateProfileSettings, { input: updateProfileInput }),
      )
    } else {
      const createProfileSettingsInput: CreateProfileSettingsInput = {
        latestExportKey: exportLambda.data.createDataExportForUser,
      }
      // create profile with latest export
      await API.graphql(
        graphqlOperation(createProfileSettings, {
          input: createProfileSettingsInput,
        }),
      )
    }

    const dataFile = await downloadExportDataAPI(
      exportLambda.data.createDataExportForUser,
    )

    return {
      media: dataFile,
      latestExportKey: exportLambda.data.createDataExportForUser,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const downloadExportDataAPI = async (s3Key: string) => {
  const exportData: any = await Storage.get(s3Key, {
    download: true,
    level: 'private',
  })
  const signedUrl: any = await Storage.get(s3Key, {
    download: false,
    level: 'private',
  })
  return {
    name: s3Key,
    data: exportData.Body,
    type: exportData.Body.type,
    signedUrl,
  }
}
