import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react'
import merge from 'deepmerge'
import { useMemo } from 'react'

import getConfig from 'config'

import { APOLLO_STATE } from './constants'

const config = getConfig()
let APOLLO_CLIENT: ApolloClient<NormalizedCacheObject>

const httpLink = createHttpLink({
  uri: config.publicRuntimeConfig.api.graphql,
})

const authLink = (authzClient: Auth0ContextInterface) =>
  setContext(async (_, { headers }) => {
    const { getAccessTokenSilently } = authzClient
    const token = await getAccessTokenSilently(config.publicRuntimeConfig.auth0)

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

const shouldMockServer =
  config.publicRuntimeConfig.mirage.enabled && config.publicRuntimeConfig.environment === 'develop'

const linkWithServer = (authzClient: Auth0ContextInterface) =>
  shouldMockServer
    ? {
        uri: config.publicRuntimeConfig.api.graphql,
      }
    : {
        link: authLink(authzClient).concat(httpLink),
      }

const createApolloClient = (authzClient: Auth0ContextInterface) =>
  new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
    ...linkWithServer(authzClient),
  })

export const initializeApollo = (authzClient: Auth0ContextInterface, initialState) => {
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

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProperties: Record<string, unknown>,
) => {
  if (pageProperties?.props) {
    pageProperties.props[APOLLO_STATE] = client.cache.extract()
  }

  return pageProperties
}

export const useApollo = (
  pageProperties: Record<string, unknown>,
): ApolloClient<NormalizedCacheObject> => {
  const authzClient = useAuth0()

  const state = pageProperties[APOLLO_STATE]
  const client = useMemo(() => initializeApollo(authzClient, state), [authzClient, state])

  return client
}
