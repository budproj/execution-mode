import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React, { ReactElement } from 'react'

import getConfig from 'src/config'

interface BudDocumentProperties {
  env: string
}

class BudDocument extends Document<BudDocumentProperties> {
  render(): ReactElement {
    return (
      <Html>
        <Head>
          <meta name="robots" content={this.props.env === 'production' ? 'all' : 'noindex'} />
          <link href="/fonts/CircularStd/font-face.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            data-jsd-embedded
            data-key="92b6f657-8095-4d1e-b6a9-1800fa5b344e"
            data-base-url="https://jsd-widget.atlassian.com/"
            src="https://jsd-widget.atlassian.com/assets/embed.js"
          />
        </body>
      </Html>
    )
  }
}

BudDocument.getInitialProps = async (context: DocumentContext) => {
  const { publicRuntimeConfig } = getConfig()
  const initialProperties = await Document.getInitialProps(context)

  return {
    ...initialProperties,
    env: publicRuntimeConfig.environment,
  }
}

export default BudDocument
