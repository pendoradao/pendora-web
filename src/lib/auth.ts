import { gql, useLazyQuery, useMutation } from '@apollo/client'

const CHALLENGE_QUERY = gql`
  query Challenge($request: ChallengeRequest!) {
    challenge(request: $request) {
      text
    }
  }
`;

export const AUTHENTICATE_MUTATION = gql`
  mutation Authenticate($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

export const MinimalProfileFields = gql`
  fragment MinimalProfileFields on Profile {
    id
    name
    handle
    bio
    ownedBy
    attributes {
      key
      value
    }
    picture {
      ... on MediaSet {
        original {
          url
        }
      }
      ... on NftImage {
        uri
      }
    }
    followModule {
      __typename
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query CurrentUser($ownedBy: [EthereumAddress!]) {
    profiles(request: { ownedBy: $ownedBy }) {
      items {
        ...MinimalProfileFields
        isDefault
      }
    }
    userSigNonces {
      lensHubOnChainSigNonce
    }
  }
  ${MinimalProfileFields}
`;

export function useChallenge() {
  const [loadChallenge, { error: errorChallenge, loading: challengeLoading }] = useLazyQuery(
    CHALLENGE_QUERY,
    {
      fetchPolicy: 'no-cache'
    }
  );
  return { loadChallenge, errorChallenge, challengeLoading }
}

export function useAuth() {
  const [authenticate, { error: errorAuthenticate, loading: authLoading }] = useMutation(AUTHENTICATE_MUTATION);
  return { authenticate, errorAuthenticate, authLoading }
}

export function useCurrentUser() {
  const [getProfiles, { error: errorProfiles, loading: profilesLoading }] = useLazyQuery(CURRENT_USER_QUERY);
  return { getProfiles, errorProfiles, profilesLoading }
}