import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'

import {
  listMoments,
  getReflexion,
  listReflexions,
} from '../../graphql/queries'

import {
  createReflexion,
  createReflexionMoment,
  updateReflexion,
  deleteReflexionMoment,
} from '../../graphql/mutations'
import {
  CreateReflexionInput,
  UpdateReflexionInput,
  CreateReflexionMomentInput,
  DeleteReflexionMomentInput,
  ReflexionState,
  ListMomentsQuery,
  Moment,
  GetReflexionQuery,
  GetMomentQueryVariables,
  Reflexion,
  ReflexionMoment,
} from '../../API'

export const updateReflexion2 = /* GraphQL */ `
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

export const createReflextionAPI = async (reflection: State) => {
  return new Promise<Reflexion>(async (resolve, reject) => {
    const input = { ...reflection }

    delete input.momentIDs

    let result: Reflexion | undefined

    if (reflection.id) {
      const res = (await API.graphql(
        graphqlOperation(updateReflexion2, { input }),
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
            const runnter = removeConnection(id)
            connectionArray.push(runnter)
          }
        })

        reflection.momentIDs?.forEach(id => {
          const cuid = filterdResult
            .map(({ moment }) => moment?.id)
            .filter(item => item !== undefined) as string[]

          if (result?.id && !cuid.includes(id)) {
            const runnter = makeConnection(result.id, id)
            connectionArray.push(runnter)
          }
        })
      }

      await Promise.all(connectionArray).catch(console.error)
      resolve(result)
    }
    reject(new Error('something gone wrong'))
  })
}

export const makeConnection = async (
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

export const removeConnection = async (
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

//
//
//
//
//
//
//
//
//
// SONSTIGER SHIT !
export const loadallmoments = async (): Promise<Moment[]> => {
  const res = (await API.graphql(
    graphqlOperation(listMoments),
  )) as GraphQLResult<{ listMoments: { items: Moment[] } }>
  return res.data?.listMoments.items || []
  //   const id = res.data?.createReflexion.id as string
}

export const getReflexionCall = async () => {
  const input: GetMomentQueryVariables = {
    id: 'edd8525c-5707-4a7e-a6dd-0a88f4ea0d5e',
  }
  const res = (await API.graphql(
    graphqlOperation(
      `
      query GetReflexion($id: ID!) {
        getReflexion(id: $id) {
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
              moment{
                id
              }
            }
            nextToken
          }
  
          updatedAt
          owner
    }
  }
`,
      {
        id: 'edd8525c-5707-4a7e-a6dd-0a88f4ea0d5e',
      },
    ),
  )) as GraphQLResult<{ getReflexion: GetReflexionQuery }>
  console.log(res.data)
  //   const id = res.data?.createReflexion.id as string
}

// ID Reflexion
// edd8525c-5707-4a7e-a6dd-0a88f4ea0d5e

// ID moments
// "3643e7b2-4fd0-496c-9403-e4a8e89d0f58"
// "751f8d10-0962-49cb-8ffb-d207d62ea95f"

export const listReflexionCall = async () => {
  try {
    const res = (await API.graphql(
      graphqlOperation(`
  query ListReflexions(
    $filter: ModelReflexionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReflexions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        title
        contentType
        content
        topic
        subTopic
        niveau
        indicators
        state
        deleted
        sharedUsers
        updatedAt
        owner
      }
      nextToken
    }
  }
`),
    )) as GraphQLResult<any>
    if (res.errors) console.log(res.errors)
    if (res.data) return res.data.listReflexions.items
  } catch (error) {
    console.log(error)
  }

  //   const id = res.data?.createReflexion.id as string
}
