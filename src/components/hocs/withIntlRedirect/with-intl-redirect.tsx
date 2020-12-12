import { IncomingMessage } from 'http'

import accepts from 'accepts'
import { NextComponentType, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import getConfig, { Locale } from 'src/config'
import { intlRouteAtom } from 'src/state/recoil/intl'

const withIntlRedirect = (WrappedComponent: NextComponentType, location: string) => {
  const WithRedirectWrapper = async (
    properties: Record<string, unknown>,
  ): Promise<ReactElement> => {
    const router = useRouter()
    const intlRoute = useRecoilValue(intlRouteAtom(location))

    useEffect(() => {
      ;(async () => router.push(intlRoute))()
    }, [intlRoute, router])

    return <WrappedComponent {...properties} />
  }

  WithRedirectWrapper.getInitialProps = async (context: NextPageContext) => {
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
      )?.source ?? location

    if (context.req && context.res && !context.res.headersSent) {
      context.res.writeHead(302, { Location: intlRoute.replace(`/${locale}`, '') })
      context.res.end()
    }

    const properties =
      WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(context))

    return { ...properties }
  }

  return WithRedirectWrapper
}

export default withIntlRedirect
