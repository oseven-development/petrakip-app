import { API, graphqlOperation } from 'aws-amplify'
import { getMoment, listMoments } from '../../graphql/queries'
import { Moment } from '../../API'

export interface getMomentAPIInput {
  id?: string
}

async function getMomentAPI({ id }: getMomentAPIInput): Promise<Moment>
async function getMomentAPI(): Promise<Moment[]>
async function getMomentAPI(input?: getMomentAPIInput) {
  try {
    if (input?.id) {
      const { id } = input
      const result: any = await API.graphql(graphqlOperation(getMoment, { id }))
      return result.data.getMoment as Moment
    } else {
      const result: any = await API.graphql(graphqlOperation(listMoments))
      return result.data.listMoments.items as Moment[]
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { getMomentAPI }
