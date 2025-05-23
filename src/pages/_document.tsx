import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'
import React, { ReactElement } from 'react'

import getConfig from 'src/config'

interface BudDocumentProperties {
  env: string
  clarity: string
}

class BudDocument extends Document<BudDocumentProperties> {
  render(): ReactElement {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="robots" content={this.props.env === 'production' ? 'all' : 'noindex'} />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="57x57"
            href="/icons/apple-touch-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="114x114"
            href="/icons/apple-touch-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="72x72"
            href="/icons/apple-touch-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="144x144"
            href="/icons/apple-touch-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="60x60"
            href="/icons/apple-touch-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="120x120"
            href="/icons/apple-touch-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="76x76"
            href="/icons/apple-touch-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="152x152"
            href="/icons/apple-touch-icon-152x152.png"
          />
          <link rel="icon" type="image/png" href="/icons/favicon-196x196.png" sizes="196x196" />
          <link rel="icon" type="image/png" href="/icons/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="/icons/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/icons/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/icons/favicon-128.png" sizes="128x128" />
          <meta name="application-name" content="&nbsp;" />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="msapplication-TileImage" content="mstile-144x144.png" />
          <meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
          <meta name="msapplication-square150x150logo" content="mstile-150x150.png" />
          <meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
          <meta name="msapplication-square310x310logo" content="mstile-310x310.png" />
          <Script
            id="microsoft-clarity-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${this.props.clarity}");
                `,
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

BudDocument.getInitialProps = async (context: DocumentContext) => {
  const { publicRuntimeConfig } = getConfig()
  const initialProperties = await Document.getInitialProps(context)

  return {
    ...initialProperties,
    env: publicRuntimeConfig.environment,
    clarity: publicRuntimeConfig.microsoft.clarity,
  }
}

export default BudDocument
