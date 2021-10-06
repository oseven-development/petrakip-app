import { API, graphqlOperation, Storage } from 'aws-amplify'

export const customListProfileSettingss = /* GraphQL */ `
  query ListProfileSettingss(
    $filter: ModelProfileSettingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfileSettingss(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        profilePicture {
          bucket
          key
          region
          identityId
        }
        latestExportKey
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`

export const getProfileAPI = async () => {
  try {
    const result: any = await API.graphql(
      graphqlOperation(customListProfileSettingss),
    )
    if (result.data.listProfileSettingss.items.length < 1) {
      return {
        picture: {
          name: '',
          data: '',
          type: '',
        },
        settings: {},
      }
    }
    if (result.data.listProfileSettingss.items[0].profilePicture) {
      const profilePictureKey =
        result.data.listProfileSettingss.items[0].profilePicture.key
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
        settings: result.data.listProfileSettingss.items[0],
      }
    } else {
      return {
        picture: {
          name: '',
          data: '',
          type: '',
        },
        settings: result.data.listProfileSettingss.items[0],
      }
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
