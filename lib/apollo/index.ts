import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react'
import merge from 'deepmerge'
import { AppProps } from 'next/app'
import { useMemo } from 'react'

import getConfig from 'src/config'

import { APOLLO_STATE } from './constants'

let APOLLO_CLIENT: ApolloClient<NormalizedCacheObject>

const authLink = (authzClient: Auth0ContextInterface) =>
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
  const shouldMockServer =
    publicRuntimeConfig.mirage.enabled && publicRuntimeConfig.environment === 'develop'

  const httpLink = createHttpLink({
    uri: publicRuntimeConfig.api.graphql,
  })

  return shouldMockServer
    ? { uri: publicRuntimeConfig.api.graphql }
    : // eslint-disable-next-line unicorn/prefer-spread
      { link: authLink(authzClient).concat(httpLink) }
}

const createApolloClient = (authzClient: Auth0ContextInterface) =>
  new ApolloClient({
    cache: new InMemoryCache(),
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

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProperties: AppProps['pageProps'],
) => {
  if (pageProperties?.props) {
    pageProperties.props[APOLLO_STATE] = client.cache.extract()
  }

  return pageProperties
}

export const useApollo = (
  pageProperties: AppProps['pageProps']['props'],
): ApolloClient<NormalizedCacheObject> => {
  const authzClient = useAuth0()

  const state: NormalizedCacheObject = pageProperties[APOLLO_STATE]
  const client = useMemo(() => initializeApollo(authzClient, state), [authzClient, state])

  return client
}
