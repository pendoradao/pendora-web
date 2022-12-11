import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import axios from 'axios';
import Cookies, { CookieAttributes } from 'js-cookie';
import jwtDecode from 'jwt-decode';

import { API_URL } from '@constants';

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}

const result: PossibleTypesResultData = {
  possibleTypes: {
    CollectModule: [
      'FeeCollectModuleSettings',
      'FreeCollectModuleSettings',
      'LimitedFeeCollectModuleSettings',
      'LimitedTimedFeeCollectModuleSettings',
      'RevertCollectModuleSettings',
      'TimedFeeCollectModuleSettings'
    ],
    FollowModule: ['FeeFollowModuleSettings', 'ProfileFollowModuleSettings', 'RevertFollowModuleSettings'],
    MainPostReference: ['Mirror', 'Post'],
    MentionPublication: ['Comment', 'Post'],
    MirrorablePublication: ['Comment', 'Post'],
    Notification: [
      'NewCollectNotification',
      'NewCommentNotification',
      'NewFollowerNotification',
      'NewMentionNotification',
      'NewMirrorNotification'
    ],
    ProfileMedia: ['MediaSet', 'NftImage'],
    Publication: ['Comment', 'Mirror', 'Post'],
    PublicationForSale: ['Comment', 'Post'],
    PublicationSearchResultItem: ['Comment', 'Post'],
    ReferenceModule: ['FollowOnlyReferenceModuleSettings'],
    RelayResult: ['RelayError', 'RelayerResult'],
    SearchResult: ['ProfileSearchResult', 'PublicationSearchResult'],
    TransactionResult: ['TransactionError', 'TransactionIndexedResult']
  }
};

export const COOKIE_CONFIG: CookieAttributes = {
  sameSite: 'None',
  secure: true,
  expires: 360
};

const REFRESH_AUTHENTICATION_MUTATION = `
  mutation Refresh($request: RefreshRequest!) {
    refresh(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

const httpLink = new HttpLink({
  uri: API_URL,
  fetchOptions: 'no-cors',
  fetch
});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = Cookies.get('accessToken');

  if (accessToken === 'undefined' || !accessToken) {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    return forward(operation);
  } else {
    operation.setContext({
      headers: {
        'x-access-token': accessToken ? `Bearer ${accessToken}` : ''
      }
    });

    const { exp }: { exp: number } = jwtDecode(accessToken);

    if (Date.now() >= exp * 1000) {
      axios(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          operationName: 'Refresh',
          query: REFRESH_AUTHENTICATION_MUTATION,
          variables: {
            request: { refreshToken: Cookies.get('refreshToken') }
          }
        })
      })
        .then(({ data }) => {
          const refresh = data?.data?.refresh;
          operation.setContext({
            headers: {
              'x-access-token': accessToken ? `Bearer ${refresh?.accessToken}` : ''
            }
          });
          Cookies.set('accessToken', refresh?.accessToken, COOKIE_CONFIG);
          Cookies.set('refreshToken', refresh?.refreshToken, COOKIE_CONFIG);
        })
        .catch(() => console.log('ERROR_MESSAGE'));
    }

    return forward(operation);
  }
});

const cache = new InMemoryCache({ possibleTypes: result.possibleTypes });

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

export const nodeClient = new ApolloClient({
  link: httpLink,
  cache
});

// export client;
