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
