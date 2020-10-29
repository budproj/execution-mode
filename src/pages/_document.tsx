import React, { ReactElement } from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import getConfig from 'next/config'

import theme from 'themes/preset-base'
import { IntlIncomingMessage, Locale } from 'server/intl/types'

interface BudDocumentContext extends DocumentContext {
  req: IntlIncomingMessage
}

interface BudDocumentInitialProps extends DocumentInitialProps {
  locale?: Locale
}

interface BudDocumentProps {
  locale: Locale
  lang: string
  nonce: string
  env: string
}

class BudDocument extends Document<BudDocumentProps> {
  render(): ReactElement {
    return (
      <Html lang={this.props.lang}>
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta name="robots" content={this.props.env === 'production' ? 'all' : 'noindex'} />
          <link href="/fonts/CircularStd/font-face.css" rel="stylesheet" />
          <script
            nonce={this.props.nonce}
            dangerouslySetInnerHTML={{
              __html: `window.LOCALE="${this.props.locale}"`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

BudDocument.getInitialProps = async (ctx: BudDocumentContext) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage
  const { req } = ctx
  const { publicRuntimeConfig } = getConfig()

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps: BudDocumentInitialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    locale: req.locale,
    lang: req.lang,
    nonce: req.nonce,
    env: publicRuntimeConfig.environments.current,
  }
}

export default BudDocument
