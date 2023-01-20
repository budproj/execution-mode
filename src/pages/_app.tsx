import { AppState, Auth0Provider } from '@auth0/auth0-react'
import { ChakraProvider } from '@chakra-ui/react'
import App, { AppContext, AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import { RecoilRoot } from 'recoil'

import AuthzApolloProvider from 'src/components/Base/AuthzApolloProvider'
import AuthzGatekeeper from 'src/components/Base/AuthzGatekeeper'
import FlagsmithProvider from 'src/components/Base/FlagsmithProvider'
import HotjarProvider from 'src/components/Base/HotjarProvider'
import { HubSpotProvider } from 'src/components/Base/HubSpotProvider/wrapper'
import MaintenanceGatekeeper from 'src/components/Base/MaintenanceGatekeeper'
import NoticesBanner from 'src/components/Base/NoticesBanner'
import ProgressBar from 'src/components/Base/ProgressBar'
import RecoilDebugObserver from 'src/components/Base/RecoilDebugObserver'
import RecoilIntlProvider from 'src/components/Base/RecoilIntlProvider'
import { RoutinesFormActionsProvider } from 'src/components/Base/RoutineFormActionsProvider/routine-form-actions-provider'
import { ServicesProvider } from 'src/components/Base/ServicesProvider'
import { SocketIOProvider } from 'src/components/Base/SocketIOProvider'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { RetrospectiveRoutine } from 'src/components/Routine'
import TeamRedirectPage from 'src/components/Routine/Drawer/Base/TeamRedirectPage/team-redirect-page'
import getConfig from 'src/config'
import theme from 'src/themes/preset-base'

import { AmplitudeProvider } from '../components/Base/AmplitudeProvider/amplitude-provider'

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
    await router.replace(appState?.returnTo ?? '/')
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
        <ChakraProvider theme={theme}>
          <SocketIOProvider>
            <AuthzGatekeeper>
              <AmplitudeProvider>
                <AuthzApolloProvider pageProps={pageProps}>
                  <RecoilIntlProvider locale={locale ?? 'pt-BR'} messages={messages}>
                    <FlagsmithProvider>
                      <ServicesProvider>
                        <RoutinesFormActionsProvider>
                          <>
                            <NoticesBanner />
                            <MaintenanceGatekeeper>
                              <HotjarProvider />
                              <HubSpotProvider />
                              <ProgressBar />
                              <KeyResultSingleDrawer />
                              <TeamRedirectPage />
                              <RetrospectiveRoutine />
                              <Component {...pageProps} />
                            </MaintenanceGatekeeper>
                          </>
                        </RoutinesFormActionsProvider>
                      </ServicesProvider>
                    </FlagsmithProvider>
                  </RecoilIntlProvider>
                </AuthzApolloProvider>
              </AmplitudeProvider>
            </AuthzGatekeeper>
          </SocketIOProvider>
        </ChakraProvider>
      </RecoilRoot>
    </Auth0Provider>
  )
}

BudApp.getInitialProps = async (appContext: AppContext) => {
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

export default BudApp
