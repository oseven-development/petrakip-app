import { API, graphqlOperation, Storage } from 'aws-amplify'
import { ContentType, CreateMomentInput } from '../../API'
import { extension } from 'mime-types'
import awsExports from '../../aws-exports'
import { createMoment } from '../../graphql/mutations'
import { GraphQLResult } from '@aws-amplify/api-graphql'

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

export const createMomentAPI = async ({
  moment,
  media,
}: {
  moment: CreateMomentInput
  media: Media
}) => {
  try {
    if (moment.title.length === 0) {
      throw new Error('No title defined')
    }
    // upload asset media file to s3
    if (media.type !== 'text') {
      // casting as s3Metadata, because .put is return Object, which can not be adjusted with an interface
      const s3MetaData = (await Storage.put(
        media.name
          ? media.name
          : `${moment.title}-${new Date().toISOString()}.${extension(
              media.type,
            )}`,
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
      }
    } else {
      moment.content = media.data as string
    }
    moment.contentType = getContentType(media.type)
    moment.createdAt = new Date().toISOString()

    const res = (await API.graphql(
      graphqlOperation(createMoment, { input: moment }),
    )) as GraphQLResult<{ createMoment: CreateMomentInput }>

    return res.data?.createMoment
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getContentType = (mimeType: string) => {
  if (mimeType.includes('audio')) {
    return ContentType.audio
  } else if (mimeType.includes('video')) {
    return ContentType.video
  } else if (mimeType.includes('image')) {
    return ContentType.image
  } else if (mimeType.includes('text')) {
    return ContentType.text
  } else {
    return undefined
  }
}
