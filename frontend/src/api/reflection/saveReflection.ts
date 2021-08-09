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

interface CreateReflectionInputWithMomentIDs extends CreateReflectionInput {
  momentIDs?: string[]
}

enum Operations {
  create,
  update,
}

interface Operation {
  input:
    | CreateReflectionInput
    | CreateReflectionMomentInput
    | DeleteReflectionMomentInput
  query: string
  key:
    | 'createReflection'
    | 'updateReflection'
    | 'deleteReflectionMoment'
    | 'createReflectionMoment'
}

export const saveReflectionAPI = async (
  reflection: CreateReflectionInputWithMomentIDs,
): Promise<Reflection> => {
  const updateState = reflection.id ? Operations.update : Operations.create

  return new Promise<Reflection>(async (resolve, reject) => {
    const input = { ...reflection }

    delete input.momentIDs

    const operation: { [key: string]: Operation } = {
      [Operations.update]: {
        input,
        query: updateReflectionMutation,
        key: 'updateReflection',
      },
      [Operations.create]: {
        input,
        query: createReflection,
        key: 'createReflection',
      },
    }

    const result = await apiCall<Reflection>(operation[updateState]).catch(
      reject,
    )

    if (result) {
      const connectionArray: Promise<
        CreateReflectionMomentInput | DeleteReflectionMomentInput | undefined
      >[] = []

      if (result.moments?.items) {
        const filterdResult = result.moments?.items.filter(
          item => item != null,
        ) as ReflectionMoment[]

        filterdResult.forEach(({ id, moment }) => {
          if (id && moment?.id && !reflection.momentIDs?.includes(moment.id)) {
            const input: DeleteReflectionMomentInput = {
              id,
            }
            const runner = apiCall<ReflectionMoment>({
              input,
              key: 'deleteReflectionMoment',
              query: deleteReflectionMoment,
            })
            connectionArray.push(runner)
          }
        })

        reflection.momentIDs?.forEach(id => {
          const cuid = filterdResult
            .map(({ moment }) => moment?.id)
            .filter(item => item !== undefined) as string[]

          if (result?.id && !cuid.includes(id)) {
            const input: CreateReflectionMomentInput = {
              reflectionID: result.id,
              momentID: id,
            }
            const runner = apiCall<ReflectionMoment>({
              input,
              key: 'createReflectionMoment',
              query: createReflectionMoment,
            })
            connectionArray.push(runner)
          }
        })
      }
      await Promise.all(connectionArray).catch(reject)
      resolve(result)
    }
    reject(new Error('something gone wrong'))
  })
}

async function apiCall<T>({
  input,
  query,
  key,
}: Operation): Promise<T | undefined> {
  try {
    const res = (await API.graphql(
      graphqlOperation(query, { input }),
    )) as GraphQLResult<{ [key: string]: T }>
    if (res.errors) throw res.errors
    if (res.data) return res.data[key]
  } catch (error) {
    console.error(error)
  }
}
