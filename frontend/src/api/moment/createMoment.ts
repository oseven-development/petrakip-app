import { API, graphqlOperation, Storage } from 'aws-amplify'
import { ContentType, CreateMomentInput } from '../../API'
import { extension } from 'mime-types'
import awsExports from '../../aws-exports'
import { createMoment } from '../../graphql/mutations'

export interface Media {
  name: string
  data: File | string | any
  type: string
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
      const s3MetaData: any = await Storage.put(
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
      )
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

    console.log(moment)
    const res: any = await API.graphql(
      graphqlOperation(createMoment, { input: moment }),
    )
    return res.data.createMoment
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getContentType = (mimeType: any) => {
  if (mimeType.includes('audio')) {
    return ContentType.audio
  } else if (mimeType.includes('video')) {
    return ContentType.video
  } else if (mimeType.includes('image')) {
    return ContentType.image
  } else if (mimeType.includes('text')) {
    return ContentType.text
  } else {
    throw new Error(`MimeType ${mimeType} not assignable`)
  }
}
