export const GetReflecionsShareQuery = /* GraphQL */ `
  query GetReflection($id: ID!) {
    getReflection(id: $id) {
      id
      sharedUsers
      sharedUsersDetail {
        id
        email
      }
      moments {
        items {
          moment {
            id
          }
        }
        nextToken
      }
    }
  }
`
