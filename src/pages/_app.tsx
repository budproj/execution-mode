import React, { ReactElement } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import Template from 'components/Layout/Template'
import theme from 'themes/preset-base'

const BudApp = (props: AppProps): ReactElement => {
  const { Component, pageProps } = props

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles) ?? false
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Template>
        <CssBaseline />
        <Component {...pageProps} />
      </Template>
    </ThemeProvider>
  )
}

export default BudApp
