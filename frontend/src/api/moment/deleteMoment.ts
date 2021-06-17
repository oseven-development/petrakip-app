import { API, graphqlOperation, Storage } from 'aws-amplify'
import { Moment } from '../../API'
import { deleteMoment } from '../../graphql/mutations'
import { Media } from './saveMoment'

// Can't use Moment from API.ts due to __typename

export const removeMomentAPI = async ({
  moment,
  media,
}: {
  moment: Moment
  media: Media
}) => {
  try {
    // checks if asset is s3 object and if has a key
    if (media.type !== 'text' || moment?.asset?.key) {
      // remove object from s3
      await Storage.remove(media.name, {
        level: 'private',
      })
    }
    // delete moment
    await API.graphql(
      graphqlOperation(deleteMoment, { input: { id: moment.id } }),
    )
  } catch (error) {
    console.error(error)
    throw error
  }
}
