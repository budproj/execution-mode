import { AppState, Auth0Provider } from '@auth0/auth0-react'
import { ChakraProvider } from '@chakra-ui/react'
import App, { AppContext, AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import { RecoilRoot } from 'recoil'

import RecoilDebugObserver from 'components/Base/RecoilDebugObserver'
import { makeServer } from 'lib/mirage'
import AuthzApolloProvider from 'src/components/Base/AuthzApolloProvider'
import AuthzGatekeeper from 'src/components/Base/AuthzGatekeeper'
import Page from 'src/components/Base/Page'
import RecoilIntlProvider from 'src/components/Base/RecoilIntlProvider'
import getConfig from 'src/config'
import theme from 'src/themes/preset-base'
import 'focus-visible/dist/focus-visible' // Keeps outline only in keytboard navigation. As seem in: https://github.com/chakra-ui/chakra-ui/issues/2016#issuecomment-691674038

type IntlMessage = Record<string, string>

interface BudAppProperties extends AppProps {
  locale: string | undefined
  messages: IntlMessage
}

const config = getConfig()

const getMessages = async (locale: string | undefined): Promise<IntlMessage | undefined> =>
  require(`../../compiled-lang/${locale ?? 'pt-BR'}.json`)

const BudApp = (properties: BudAppProperties): ReactElement => {
  const { Component, pageProps, locale, messages } = properties
  const router = useRouter()

  const onAuth0RedirectCallback = async (appState: AppState): void => {
    await router.replace(appState?.returnTo ?? window.location.pathname)
  }

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) jssStyles.remove()
  }, [])

  return (
    <Auth0Provider
      useRefreshTokens
      domain={config.publicRuntimeConfig.auth0.domain}
      clientId={config.publicRuntimeConfig.auth0.clientID}
      scope={config.publicRuntimeConfig.auth0.scope}
      redirectUri={typeof window === 'undefined' ? '' : window.location.origin}
      cacheLocation="localstorage"
      onRedirectCallback={onAuth0RedirectCallback}
    >
      <RecoilRoot>
        <RecoilDebugObserver />
        <RecoilIntlProvider locale={locale ?? 'pt-BR'} messages={messages}>
          <ChakraProvider theme={theme}>
            <AuthzGatekeeper>
              <AuthzApolloProvider pageProps={pageProps}>
                <Page>
                  <Component {...pageProps} />
                </Page>
              </AuthzApolloProvider>
            </AuthzGatekeeper>
          </ChakraProvider>
        </RecoilIntlProvider>
      </RecoilRoot>
    </Auth0Provider>
  )
}

BudApp.getInitialProps = async (appContext: AppContext): Promise<BudAppProperties> => {
  const pageProperties = {}

  const { Component, ctx, router } = appContext
  const { locale } = router

  const [appProperties, messages] = await Promise.all([
    App.getInitialProps(appContext),
    getMessages(locale),
  ])

  if (Component.getInitialProps) {
    Object.assign(pageProperties, await Component.getInitialProps(ctx))
  }

  return {
    ...appProperties,
    pageProps: pageProperties,
    locale,
    messages: messages ?? {},
  }
}

if (
  config.publicRuntimeConfig.nodeEnv === 'development' &&
  config.publicRuntimeConfig.mirage.enabled
)
  makeServer('development')

export default BudApp
