import React, { ReactElement } from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import getConfig from 'next/config'

import theme from 'themes/preset-base'

interface BudDocumentProps {
  env: string
}

class BudDocument extends Document<BudDocumentProps> {
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

BudDocument.getInitialProps = async (ctx: DocumentContext) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage
  const { publicRuntimeConfig } = getConfig()

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    env: publicRuntimeConfig.environment,
  }
}

export default BudDocument
