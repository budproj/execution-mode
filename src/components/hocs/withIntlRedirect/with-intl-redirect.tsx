import { IncomingMessage } from 'http'

import accepts from 'accepts'
import { NextComponentType, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React, { ComponentType, ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import getConfig, { Locale } from 'src/config'
import isBrowser from 'src/specifications/is-browser'
import { intlRouteAtom } from 'src/state/recoil/intl'

const withIntlRedirect = (WrappedComponent: NextComponentType, location: string): ComponentType => {
  const WithRedirectWrapper = async (
    properties: Record<string, unknown>,
  ): Promise<ReactElement> => {
    const router = useRouter()
    console.log('ok')
    const intlRoute = useRecoilValue(intlRouteAtom(location))

    if (isBrowser()) {
      await router.push(intlRoute)
    }

    return <WrappedComponent {...properties} />
  }

  WithRedirectWrapper.getInitialProps = async (
    context: NextPageContext,
  ): Promise<Record<string, unknown> | undefined> => {
    const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

    const accept = accepts(context?.req as IncomingMessage)
    const locale =
      (accept.language(serverRuntimeConfig.supportedLocales) as Locale) ||
      publicRuntimeConfig.defaultLocale
    const intlRoute =
      publicRuntimeConfig.intlRoutes.find(
        (item) =>
          (item.destination === location || item.destination === `/${location}`) &&
          item.locale === locale,
      ).source || location

    if (!isBrowser() && context.res && !context.res.headersSent) {
      context.res.writeHead(302, { Location: intlRoute })
      context.res.end()
    }

    const properties =
      WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(context))

    return { ...properties }
  }

  return WithRedirectWrapper
}

export default withIntlRedirect
