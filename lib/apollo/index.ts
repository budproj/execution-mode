import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react'
import { SentryLink } from 'apollo-link-sentry'
import { createUploadLink } from 'apollo-upload-client'
import merge from 'deepmerge'
import { AppProps } from 'next/app'
import { useMemo } from 'react'

import getConfig from 'src/config'

import { AmplitudeHook, useAmplitude } from '../../src/state/hooks/useAmplitude/hook'

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

const amplitudeLinkFactory = ({ deviceID, sessionID }: AmplitudeHook) =>
  setContext((_, { headers, ...previousContext }) => ({
    ...previousContext,
    headers: {
      ...headers,
      'Device-ID': deviceID,
      'Session-ID': sessionID,
    },
  }))

const linkWithServer = (authzClient: Auth0ContextInterface, amplitude: AmplitudeHook) => {
  const { publicRuntimeConfig } = getConfig()

  const authLink = authzLinkFactory(authzClient)
  const amplitudeLink = amplitudeLinkFactory(amplitude)
  const uploadLink = createUploadLink({
    uri: publicRuntimeConfig.api.graphql,
  })
  const sentryLink = new SentryLink({
    attachBreadcrumbs: {
      includeQuery: true,
      includeVariables: true,
    },
  })

  return { link: ApolloLink.from([sentryLink, authLink, amplitudeLink, uploadLink]) }
}

const createApolloClient = (authzClient: Auth0ContextInterface, amplitude: AmplitudeHook) =>
  new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
    ...linkWithServer(authzClient, amplitude),
  })

export const initializeApollo = (
  authzClient: Auth0ContextInterface,
  amplitude: AmplitudeHook,
  initialState: NormalizedCacheObject,
) => {
  const apolloClient = APOLLO_CLIENT ?? createApolloClient(authzClient, amplitude)

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
  const amplitude = useAmplitude()

  const state: NormalizedCacheObject = pageProperties[APOLLO_STATE]
  const client = useMemo(
    () => initializeApollo(authzClient, amplitude, state),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authzClient, state],
  )

  return client
}
