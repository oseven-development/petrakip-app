import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'

import { listMoments } from '../../graphql/queries'

import {
  createReflection,
  createReflectionMoment,
  deleteReflectionMoment,
} from '../../graphql/mutations'

import {
  CreateReflectionInput,
  CreateReflectionMomentInput,
  DeleteReflectionMomentInput,
  Moment,
  Reflection,
  ReflectionMoment,
} from '../../API'

export const updateReflectionMutation = /* GraphQL */ `
  mutation UpdateReflection(
    $input: UpdateReflectionInput!
    $condition: ModelReflectionConditionInput
  ) {
    updateReflection(input: $input, condition: $condition) {
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

interface State extends CreateReflectionInput {
  momentIDs?: string[]
}

export const saveReflectionAPI = async (reflection: State) => {
  // TODO USE Updatestate
  //const updateState = moment.id ? 'update' : 'create'

  return new Promise<Reflection>(async (resolve, reject) => {
    const input = { ...reflection }

    delete input.momentIDs

    let result: Reflection | undefined

    if (reflection.id) {
      const res = (await API.graphql(
        graphqlOperation(updateReflectionMutation, { input }),
      )) as GraphQLResult<{ updateReflection: Reflection }>
      if (res.errors) throw res.errors
      if (res.data) result = res.data.updateReflection
    } else {
      const res = (await API.graphql(
        graphqlOperation(createReflection, { input }),
      )) as GraphQLResult<{ createReflection: Reflection }>
      if (res.errors) throw res.errors
      if (res.data) result = res.data.createReflection
    }

    if (result) {
      const connectionArray: Array<
        | Promise<DeleteReflectionMomentInput | undefined>
        | Promise<CreateReflectionMomentInput | undefined>
      > = []

      if (result.moments?.items) {
        const filterdResult = result.moments?.items.filter(
          item => item != null,
        ) as ReflectionMoment[]

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
  reflectionID: string,
  momentID: string,
): Promise<ReflectionMoment> => {
  const input: CreateReflectionMomentInput = {
    reflectionID,
    momentID,
  }
  const res = (await API.graphql(
    graphqlOperation(createReflectionMoment, { input }),
  )) as GraphQLResult<{ createReflectionMoment: ReflectionMoment }>

  return new Promise((resolve, reject) => {
    if (res.errors) throw res.errors
    if (res.data) {
      resolve(res.data.createReflectionMoment)
    }
  })
}

const removeConnectionMomentToReflectionAPI = async (
  id: string,
): Promise<ReflectionMoment> => {
  const input: DeleteReflectionMomentInput = {
    id,
  }
  const res = (await API.graphql(
    graphqlOperation(deleteReflectionMoment, { input }),
  )) as GraphQLResult<{ deleteReflectionMoment: ReflectionMoment }>

  return new Promise((resolve, reject) => {
    if (res.errors) throw res.errors
    if (res.data) resolve(res.data.deleteReflectionMoment)
  })
}

// FIXME REMOVE LATER
export const loadAllMomentsAPI = async (): Promise<Moment[]> => {
  const res = (await API.graphql(
    graphqlOperation(listMoments),
  )) as GraphQLResult<{ listMoments: { items: Moment[] } }>
  return res.data?.listMoments.items || []
}
