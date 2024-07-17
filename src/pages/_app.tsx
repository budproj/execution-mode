import { AppState, Auth0Provider } from '@auth0/auth0-react'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App, { AppContext, AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import { RecoilRoot } from 'recoil'

import 'htmx.org'

import AuthzApolloProvider from 'src/components/Base/AuthzApolloProvider'
import AuthzGatekeeper from 'src/components/Base/AuthzGatekeeper'
import FlagsmithProvider from 'src/components/Base/FlagsmithProvider'
import HotjarProvider from 'src/components/Base/HotjarProvider'
import { HubSpotProvider } from 'src/components/Base/HubSpotProvider/wrapper'
import MaintenanceGatekeeper from 'src/components/Base/MaintenanceGatekeeper'
import NewsBanner from 'src/components/Base/NewsBanner'
import NoticesBanner from 'src/components/Base/NoticesBanner'
import ProgressBar from 'src/components/Base/ProgressBar'
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
const queryClient = new QueryClient()

const BudApp = (properties: BudAppProperties): ReactElement => {
  const { Component, pageProps } = properties
  const router = useRouter()

  const onAuth0RedirectCallback = (appState?: AppState): void => {
    router.replace(appState?.returnTo ?? '/')
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
        <ChakraProvider theme={theme}>
          <SocketIOProvider>
            <AuthzGatekeeper>
              <AmplitudeProvider>
                <AuthzApolloProvider pageProps={pageProps}>
                  <RecoilIntlProvider>
                    <FlagsmithProvider>
                      <ServicesProvider>
                        <QueryClientProvider client={queryClient}>
                          <RoutinesFormActionsProvider>
                            <>
                              <NoticesBanner />
                              <NewsBanner />
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
                        </QueryClientProvider>
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

  const { Component, ctx } = appContext

  const [appProperties] = await Promise.all([App.getInitialProps(appContext)])

  if (Component.getInitialProps) {
    Object.assign(pageProperties, await Component.getInitialProps(ctx))
  }

  return {
    ...appProperties,
    pageProps: pageProperties,
  }
}

export default BudApp
