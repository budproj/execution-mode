import { ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import React, { ReactElement, useMemo } from 'react'

import { useApollo } from 'lib/apollo'

export interface AuthzApolloProviderProperties {
  pageProps: Record<string, NormalizedCacheObject>
  children: ReactElement
}

const AuthzApolloProvider = ({
  pageProps,
  ...rest
}: AuthzApolloProviderProperties): ReactElement => {
  const apolloClient = useApollo(pageProps)

  return useMemo(() => <ApolloProvider client={apolloClient} {...rest} />, [apolloClient, rest])
}

export default AuthzApolloProvider
