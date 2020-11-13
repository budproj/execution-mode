import { AppState, Auth0Provider } from '@auth0/auth0-react'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import App, { AppContext, AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import { RecoilRoot } from 'recoil'

import Auth0Gatekeeper from 'components/Base/Auth0Gatekeeper'
import Page from 'components/Base/Page'
import RecoilIntlProvider from 'components/Base/RecoilIntlProvider'
import getConfig from 'config'
import { makeServer } from 'lib/mirage'
import theme from 'themes/preset-base'

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

  const onAuth0RedirectCallback = async (appState: AppState): Promise<void> => {
    await router.push(appState?.returnTo ?? window.location.pathname)
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
        <RecoilIntlProvider locale={locale ?? 'pt-BR'} messages={messages}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Auth0Gatekeeper>
              <Page>
                <Component {...pageProps} />
              </Page>
            </Auth0Gatekeeper>
          </ThemeProvider>
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
