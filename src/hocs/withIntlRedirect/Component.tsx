import { IncomingMessage } from 'http'

import React, { ComponentType, ReactElement } from 'react'
import { useRouter } from 'next/router'
import { NextComponentType, NextPageContext } from 'next'
import accepts from 'accepts'

import isBrowser from 'specifications/isBrowser'
import { useLocalizedPath } from 'hooks'
import getConfig, { Locale } from 'config'

const withRedirect = (WrappedComponent: NextComponentType, location: string): ComponentType => {
  const WithRedirectWrapper = (props: Record<string, unknown>): ReactElement => {
    const router = useRouter()
    const localizedLocation = useLocalizedPath(location)

    if (isBrowser()) {
      router.push(localizedLocation)
      return <></>
    }

    return <WrappedComponent {...props} />
  }

  WithRedirectWrapper.getInitialProps = async (
    ctx: NextPageContext,
  ): Promise<Record<string, unknown> | undefined> => {
    const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

    const accept = accepts(ctx?.req as IncomingMessage)
    const locale =
      accept.language(serverRuntimeConfig.supportedLocales) || publicRuntimeConfig.defaultLocale

    const localizedLocation = useLocalizedPath(location, locale as Locale, ctx?.req?.url as string)

    if (!isBrowser() && ctx.res && !ctx.res.headersSent) {
      ctx.res.writeHead(302, { Location: localizedLocation })
      ctx.res.end()
    }

    const props = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))

    return { ...props }
  }

  return WithRedirectWrapper
}

export default withRedirect
