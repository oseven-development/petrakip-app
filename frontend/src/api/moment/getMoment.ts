import { API, graphqlOperation } from 'aws-amplify'
import { getMoment, listMoments } from '../../graphql/queries'

export interface getMomentAPIInput {
  id?: string
}

export const getMomentAPI = async ({ id }: getMomentAPIInput) => {
  try {
    if (id) {
      const result: any = await API.graphql(graphqlOperation(getMoment, { id }))
      return result.data.getMoment
    } else {
      const result: any = await API.graphql(graphqlOperation(listMoments))
      return result.data.listMoments
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
