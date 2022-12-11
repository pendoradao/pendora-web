import { gql } from '@apollo/client'

import { client } from './request'

export const GET_PUBLICATIONS = gql`
  query Publications($id: ProfileId!, $limit: LimitScalar) {
    publications(request: {
      profileId: $id,
      publicationTypes: [POST],
      limit: $limit
    }) {
      items {
        __typename 
        ... on Post {
          ...PostFields
        }
      }
    }
  }
  fragment PostFields on Post {
    id
    metadata {
      ...MetadataOutputFields
    }
  }
  fragment MetadataOutputFields on MetadataOutput {
    content
  }
`

export const getPublications = async (id: string, limit: number) => {
  const { data } = await client.query({
    query: GET_PUBLICATIONS,
    variables: {
      id,
      limit
    }
  })
  return data.publications
}