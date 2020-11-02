import React, { Fragment, ReactElement } from 'react'
import App, { AppProps, AppContext } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { IntlProvider } from 'react-intl'

import Template from 'components/Base/Template'
import theme from 'themes/preset-base'

type IntlMessage = Record<string, string>

interface BudAppProps extends AppProps {
  locale: string | undefined
  messages: IntlMessage
}

const getMessages = (locale: string | undefined): Promise<IntlMessage> => {
  return import(`../../compiled-lang/${locale}.json`) || {}
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
    <IntlProvider locale={locale || 'pt-BR'} messages={messages}>
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

BudApp.getInitialProps = async (appContext: AppContext): Promise<BudAppProps> => {
  const pageProps = {}

  const { Component, ctx, router } = appContext
  const locale = router.locale

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
