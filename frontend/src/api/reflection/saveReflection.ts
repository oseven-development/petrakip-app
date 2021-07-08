import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'

import { listMoments } from '../../graphql/queries'

import {
  createReflexion,
  createReflexionMoment,
  deleteReflexionMoment,
} from '../../graphql/mutations'

import {
  CreateReflexionInput,
  CreateReflexionMomentInput,
  DeleteReflexionMomentInput,
  Moment,
  Reflexion,
  ReflexionMoment,
} from '../../API'

export const updateReflexionMutation = /* GraphQL */ `
  mutation UpdateReflexion(
    $input: UpdateReflexionInput!
    $condition: ModelReflexionConditionInput
  ) {
    updateReflexion(input: $input, condition: $condition) {
      id
      createdAt
      title
      contentType
      content
      asset {
        bucket
        key
        region
      }
      topic
      subTopic
      niveau
      indicators
      state
      deleted
      sharedUsers
      comments {
        createdAt
        content
      }
      orientationQuestions {
        question
      }

      moments {
        items {
          id
          moment {
            id
          }
        }
        nextToken
      }
      updatedAt
      owner
    }
  }
`

interface State extends CreateReflexionInput {
  momentIDs?: string[]
}

export const saveReflectionAPI = async (reflection: State) => {
  // TODO USE Updatestate
  //const updateState = moment.id ? 'update' : 'create'

  return new Promise<Reflexion>(async (resolve, reject) => {
    const input = { ...reflection }

    delete input.momentIDs

    let result: Reflexion | undefined

    if (reflection.id) {
      const res = (await API.graphql(
        graphqlOperation(updateReflexionMutation, { input }),
      )) as GraphQLResult<{ updateReflexion: Reflexion }>
      if (res.errors) throw res.errors
      if (res.data) result = res.data.updateReflexion
    } else {
      const res = (await API.graphql(
        graphqlOperation(createReflexion, { input }),
      )) as GraphQLResult<{ createReflexion: Reflexion }>
      if (res.errors) throw res.errors
      if (res.data) result = res.data.createReflexion
    }

    if (result) {
      const connectionArray: Array<
        | Promise<DeleteReflexionMomentInput | undefined>
        | Promise<CreateReflexionMomentInput | undefined>
      > = []

      if (result.moments?.items) {
        const filterdResult = result.moments?.items.filter(
          item => item != null,
        ) as ReflexionMoment[]

        filterdResult.forEach(({ id, moment }) => {
          if (id && moment?.id && !reflection.momentIDs?.includes(moment.id)) {
            const runnter = removeConnectionMomentToReflectionAPI(id)
            connectionArray.push(runnter)
          }
        })

        reflection.momentIDs?.forEach(id => {
          const cuid = filterdResult
            .map(({ moment }) => moment?.id)
            .filter(item => item !== undefined) as string[]

          if (result?.id && !cuid.includes(id)) {
            const runnter = addConnectionMomentToReflectionAPI(result.id, id)
            connectionArray.push(runnter)
          }
        })
      }

      // FIXME  TYPE and tsignore
      // @ts-ignore
      await Promise.all(connectionArray).catch(console.error)
      resolve(result)
    }
    reject(new Error('something gone wrong'))
  })
}

const addConnectionMomentToReflectionAPI = async (
  reflexionID: string,
  momentID: string,
): Promise<ReflexionMoment> => {
  const input: CreateReflexionMomentInput = {
    reflexionID,
    momentID,
  }
  const res = (await API.graphql(
    graphqlOperation(createReflexionMoment, { input }),
  )) as GraphQLResult<{ createReflexionMoment: ReflexionMoment }>

  return new Promise((resolve, reject) => {
    if (res.errors) throw res.errors
    if (res.data) {
      resolve(res.data.createReflexionMoment)
    }
  })
}

const removeConnectionMomentToReflectionAPI = async (
  id: string,
): Promise<ReflexionMoment> => {
  const input: DeleteReflexionMomentInput = {
    id,
  }
  const res = (await API.graphql(
    graphqlOperation(deleteReflexionMoment, { input }),
  )) as GraphQLResult<{ deleteReflexionMoment: ReflexionMoment }>

  return new Promise((resolve, reject) => {
    if (res.errors) throw res.errors
    if (res.data) resolve(res.data.deleteReflexionMoment)
  })
}

// FIXME REMOVE LATER
export const loadAllMomentsAPI = async (): Promise<Moment[]> => {
  const res = (await API.graphql(
    graphqlOperation(listMoments),
  )) as GraphQLResult<{ listMoments: { items: Moment[] } }>
  return res.data?.listMoments.items || []
}
