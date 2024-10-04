/* eslint-disable @typescript-eslint/default-param-last */
import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { offsetLimitPagination } from '@apollo/client/utilities'
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react'
import { SentryLink } from 'apollo-link-sentry'
import { createUploadLink } from 'apollo-upload-client'
import merge from 'deepmerge'
import { useMemo } from 'react'

import getConfig from 'src/config'

import { APOLLO_STATE } from './constants'

let APOLLO_CLIENT: ApolloClient<NormalizedCacheObject>

const authzLinkFactory = (authzClient: Auth0ContextInterface) =>
  setContext(async (_, { headers }) => {
    const { publicRuntimeConfig } = getConfig()
    const { getAccessTokenSilently } = authzClient
    const token = await getAccessTokenSilently(publicRuntimeConfig.auth0)

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

const linkWithServer = (authzClient: Auth0ContextInterface) => {
  const { publicRuntimeConfig } = getConfig()

  const authLink = authzLinkFactory(authzClient)
  const uploadLink = createUploadLink({
    uri: publicRuntimeConfig.api.graphql,
  })
  const sentryLink = new SentryLink({
    attachBreadcrumbs: {
      includeQuery: true,
      includeVariables: true,
    },
  })

  return { link: ApolloLink.from([sentryLink, authLink, uploadLink]) }
}

const createApolloClient = (authzClient: Auth0ContextInterface) =>
  new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            GET_KEY_RESULTS: offsetLimitPagination(),
          },
        },
      },
    }),
    ssrMode: typeof window === 'undefined',
    ...linkWithServer(authzClient),
  })

export const initializeApollo = (
  authzClient: Auth0ContextInterface,
  initialState: NormalizedCacheObject,
) => {
  const apolloClient = APOLLO_CLIENT ?? createApolloClient(authzClient)

  if (initialState) {
    const existingCache = apolloClient.extract()
    const data = merge(initialState, existingCache)

    apolloClient.cache.restore(data)
  }

  if (typeof window === 'undefined') return apolloClient
  if (!APOLLO_CLIENT) APOLLO_CLIENT = apolloClient

  return apolloClient
}

export const useApollo = (
  pageProperties: Record<string, NormalizedCacheObject>,
): ApolloClient<NormalizedCacheObject> => {
  const authzClient = useAuth0()

  const state: NormalizedCacheObject = pageProperties[APOLLO_STATE]
  const client = useMemo(
    () => initializeApollo(authzClient, state),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authzClient, state],
  )

  return client
}
