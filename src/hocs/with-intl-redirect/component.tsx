import { IncomingMessage } from 'http'

import accepts from 'accepts'
import { NextComponentType, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React, { ComponentType, ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import getConfig, { Locale } from 'config'
import isBrowser from 'specifications/is-browser'
import { intlRoute as intlRouteAtom } from 'state/recoil/intl/route'

const withIntlRedirect = (WrappedComponent: NextComponentType, location: string): ComponentType => {
  const WithRedirectWrapper = async (props: Record<string, unknown>): Promise<ReactElement> => {
    const router = useRouter()
    const intlRoute = useRecoilValue(intlRouteAtom(location))

    if (isBrowser()) {
      await router.push(intlRoute)
    }

    return <WrappedComponent {...props} />
  }

  WithRedirectWrapper.getInitialProps = async (
    ctx: NextPageContext,
  ): Promise<Record<string, unknown> | undefined> => {
    const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

    const accept = accepts(ctx?.req as IncomingMessage)
    const locale =
      (accept.language(serverRuntimeConfig.supportedLocales) as Locale) ||
      publicRuntimeConfig.defaultLocale
    const intlRoute =
      publicRuntimeConfig.intlRoutes.find(
        (item) =>
          (item.destination === location || item.destination === `/${location}`) &&
          item.locale === locale,
      ).source || location

    if (!isBrowser() && ctx.res && !ctx.res.headersSent) {
      ctx.res.writeHead(302, { Location: intlRoute })
      ctx.res.end()
    }

    const props = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))

    return { ...props }
  }

  return WithRedirectWrapper
}

export default withIntlRedirect
