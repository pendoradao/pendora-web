import { gql } from '@apollo/client'

import { client } from './request'
import { PublicationsQueryRequest } from '@generated/types'

export const PublicationsDocument = gql`
  query Publications($request: PublicationsQueryRequest!) {
    publications(request: $request) {
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

export const getPublications = async (request: PublicationsQueryRequest) => {
  const result = await client.query({
    query: PublicationsDocument,
    variables: {
      request,
    },
  });
  return result.data.publications;
}