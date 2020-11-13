import { ServerStyleSheets } from '@material-ui/core/styles'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React, { ReactElement } from 'react'

import getConfig from 'config'
import theme from 'themes/preset-base'

interface BudDocumentProperties {
  env: string
}

class BudDocument extends Document<BudDocumentProperties> {
  render(): ReactElement {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta name="robots" content={this.props.env === 'production' ? 'all' : 'noindex'} />
          <link href="/fonts/CircularStd/font-face.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

BudDocument.getInitialProps = async (context: DocumentContext) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = context.renderPage
  const { publicRuntimeConfig } = getConfig()

  context.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (properties) => sheets.collect(<App {...properties} />),
    })

  const initialProperties = await Document.getInitialProps(context)

  return {
    ...initialProperties,
    styles: [...React.Children.toArray(initialProperties.styles), sheets.getStyleElement()],
    env: publicRuntimeConfig.environment,
  }
}

export default BudDocument
