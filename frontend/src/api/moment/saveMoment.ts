import { API, graphqlOperation, Storage } from 'aws-amplify'
import { CreateMomentInput, Moment, UpdateMomentInput } from '../../API'
import awsExports from '../../aws-exports'
import { createMoment, updateMoment } from '../../graphql/mutations'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { getContentTypeFromMimeType } from '../../utils/getContentTypeUtils'
import { Credentials } from '@aws-amplify/core'

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

export const saveMomentAPI = async ({
  moment,
  media,
}: {
  moment: CreateMomentInput | Moment
  media: Media
}) => {
  try {
    const updateState = moment.id ? 'update' : 'create'
    // upload asset media file to s3 when new moment is created or media is updated
    if (
      media.type !== 'text' &&
      moment?.asset?.key !== `assets/${media.name}`
    ) {
      // casting as s3Metadata, because .put is return Object, which can not be adjusted with an interface
      const s3MetaData = (await Storage.put(
        `assets/${media.name}`,
        media.data,
        {
          contentType: media.type,
          level: 'private',
        },
      )) as s3MetaData

      moment.asset = {
        bucket: awsExports.aws_user_files_s3_bucket,
        region: awsExports.aws_user_files_s3_bucket_region,
        key: s3MetaData.key,
        identityId: (await Credentials.get()).identityId,
      }
      moment.contentType = getContentTypeFromMimeType(media.type)
    } else if (media.type === 'text') {
      moment.content = media.data as string
      moment.contentType = getContentTypeFromMimeType(media.type)
    }

    // update or create new moment
    if (updateState === 'create') {
      moment.createdAt = new Date().toISOString()
      const res = (await API.graphql(
        graphqlOperation(createMoment, { input: moment }),
      )) as GraphQLResult<{ createMoment: CreateMomentInput }>

      return res.data?.createMoment
    } else if (updateState === 'update') {
      // deletes field from object which are not used in update
      delete (moment as Moment).reflection
      // TODO: Fix TypeError
      //@ts-ignore
      delete (moment as Moment).updatedAt
      delete (moment as Moment).owner

      const res: any = (await API.graphql(
        graphqlOperation(updateMoment, { input: moment }),
      )) as GraphQLResult<{ updateMoment: UpdateMomentInput }>
      return res.data?.updateMoment
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
