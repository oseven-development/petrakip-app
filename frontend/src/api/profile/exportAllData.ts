import { API, graphqlOperation, Storage } from 'aws-amplify'
import { UpdateProfileSettingsInput } from '../../API'
import { updateProfileSettings } from '../../graphql/mutations'
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

    console.log(userKey)
    const exportLambda: any = await API.graphql(
      graphqlOperation(createDataExportForUser, {
        userKey,
      }),
    )
    console.log(exportLambda)

    // get profile Settings of User
    const profileSettings: any = await API.graphql(
      graphqlOperation(listProfileSettingss),
    )
    //  create updateProfileInput
    const updateProfileInput: UpdateProfileSettingsInput = {
      id: profileSettings.data.listProfileSettingss.items[0].id,
      latestExportKey: exportLambda.data.createDataExportForUser,
    }

    // update profile with latest export
    const res: any = await API.graphql(
      graphqlOperation(updateProfileSettings, { input: updateProfileInput }),
    )

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
  return {
    name: s3Key,
    data: exportData.Body,
    type: exportData.Body.type,
  }
}
