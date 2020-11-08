import { ThemeProvider } from '@material-ui/core/styles'
import App, { AppContext, AppProps } from 'next/app'
import React, { ReactElement } from 'react'
import { RecoilRoot } from 'recoil'

import Page from 'components/Base/Page'
import RecoilIntlProvider from 'components/Base/RecoilIntlProvider'
import getConfig from 'config'
import { makeServer } from 'lib/mirage'
import theme from 'themes/preset-base'

type IntlMessage = Record<string, string>

interface BudAppProps extends AppProps {
  locale: string | undefined
  messages: IntlMessage
}

const config = getConfig()

const getMessages = async (locale: string | undefined): Promise<IntlMessage | undefined> =>
  require(`../../compiled-lang/${locale ?? 'pt-BR'}.json`)

const BudApp = (props: BudAppProps): ReactElement => {
  const { Component, pageProps, locale, messages } = props

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) jssStyles.remove()
  }, [])

  return (
    <RecoilRoot>
      <RecoilIntlProvider locale={locale ?? 'pt-BR'} messages={messages}>
        <ThemeProvider theme={theme}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ThemeProvider>
      </RecoilIntlProvider>
    </RecoilRoot>
  )
}

BudApp.getInitialProps = async (appContext: AppContext): Promise<BudAppProps> => {
  const pageProps = {}

  const { Component, ctx, router } = appContext
  const { locale } = router

  const [appProps, messages] = await Promise.all([
    App.getInitialProps(appContext),
    getMessages(locale),
  ])

  if (Component.getInitialProps) {
    Object.assign(pageProps, await Component.getInitialProps(ctx))
  }

  return {
    ...appProps,
    pageProps,
    locale,
    messages,
  }
}

if (config.publicRuntimeConfig.nodeEnv === 'development') makeServer('development')

export default BudApp
