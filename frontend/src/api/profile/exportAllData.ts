import { GraphQLResult } from '@aws-amplify/api-graphql'
import { API, graphqlOperation, Storage, Auth } from 'aws-amplify'
import { UpdateProfileSettingsInput } from '../../API'
import { updateProfileSettings } from '../../graphql/mutations'
import { listProfileSettingss } from '../../graphql/queries'
import { createDataExportForUser } from '../../graphql/queries'
import { Credentials } from '@aws-amplify/core'

export const exportAllData = async () => {
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
    console.log(res)

    const dataFile = await downloadExportData(
      exportLambda.data.createDataExportForUser,
    )

    return dataFile
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const downloadExportData = async (s3Key: string) => {
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
