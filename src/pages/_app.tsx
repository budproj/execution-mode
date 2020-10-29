import React, { Fragment, ReactElement } from 'react'
import App, { AppProps, AppContext } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import Template from 'components/Layout/Template'
import theme from 'themes/preset-base'
import { IntlProvider } from 'react-intl'
import { IntlIncomingMessage, Locale } from 'server/intl/types'
import { NextPageContext } from 'next'

type IntlMessage = Record<string, string>

interface BudAppCtx extends NextPageContext {
  req: IntlIncomingMessage
}

interface BudAppProps extends AppProps {
  locale: Locale
  messages: IntlMessage
}

interface BudAppContext extends AppContext {
  ctx: BudAppCtx
}

const getMessages = (locale: Locale): Promise<IntlMessage> => {
  return import(`../../compiled-lang/${locale}.json`)
}

const BudApp = (props: BudAppProps): ReactElement => {
  const { Component, pageProps, locale, messages } = props

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles) ?? false
    }
  }, [])

  return (
    <IntlProvider locale={locale} messages={messages}>
      <ThemeProvider theme={theme}>
        <Template>
          <Fragment>
            <CssBaseline />
            <Component {...pageProps} />
          </Fragment>
        </Template>
      </ThemeProvider>
    </IntlProvider>
  )
}

BudApp.getInitialProps = async (appContext: BudAppContext) => {
  const pageProps = {}

  const { Component, ctx } = appContext
  const locale = ctx.req?.locale || window.LOCALE

  const [appProps, messages] = await Promise.all([
    App.getInitialProps(appContext),
    getMessages(locale),
  ])

  if (Component.getInitialProps) Object.assign(pageProps, await Component.getInitialProps(ctx))

  return {
    ...appProps,
    pageProps,
    locale,
    messages,
  }
}

export default BudApp
