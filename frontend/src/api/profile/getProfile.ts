import { API, graphqlOperation, Storage } from 'aws-amplify'
import { listProfileSettingss } from '../../graphql/queries'

export const getProfileAPI = async () => {
  try {
    const result: any = await API.graphql(
      graphqlOperation(listProfileSettingss),
    )
    console.log(result.data.listMoments[0])
    const profilePictureKey = result.data.listMoments[0].profilePicture.key
    const profilePicture: any = await Storage.get(profilePictureKey, {
      download: true,
      level: 'private',
    })
    return {
      picture: {
        name: profilePictureKey,
        data: profilePicture.Body,
        type: profilePicture.Body.type,
      },
      settings: result.data.listMoments[0],
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
