import { GraphQLResult } from '@aws-amplify/api-graphql'
import { API, graphqlOperation, Storage, Auth } from 'aws-amplify'
import { UpdateProfileSettingsInput } from '../../API'
import { updateProfileSettings } from '../../graphql/mutations'
import { listProfileSettingss } from '../../graphql/queries'
// import { createExportArchive } from '../../graphql/queries'

export const exportAllData = async () => {
  try {
    // const exportLambda: any = await API.graphql(
    //   graphqlOperation(createExportArchive, {
    //     username: (await Auth.currentUserInfo()).username,
    //   }),
    // )
    // console.exportLambda(res)
    // const profileSettings: any = await API.graphql(
    //   graphqlOperation(listProfileSettingss),
    // )
    // const profileInput: UpdateProfileSettingsInput = {
    //   id: profileSettings.data.listProfileSettingss.items[0].id,
    //   latestExportKey: exportLambda.data,
    // }

    // const res: any = (await API.graphql(
    //   graphqlOperation(updateProfileSettings, { input: profileInput }),
    // )) as GraphQLResult<{ updateProfileSettings: UpdateProfileSettingsInput }>

    return 'profile/profile_picture.png'
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
