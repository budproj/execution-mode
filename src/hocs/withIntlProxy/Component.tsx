import { IncomingMessage } from 'http'

import React, { ComponentType, ReactElement } from 'react'
import { useRouter } from 'next/router'
import { NextComponentType, NextPageContext } from 'next'
import accepts from 'accepts'

import { IntlRouteGroup } from './types'
import { SUPPORTED_LOCALES } from './constants'

import isBrowser from 'specifications/isBrowser'
import getConfig, { Locale } from 'config'

const withIntlProxy = (
  WrappedComponent: NextComponentType,
  routeGroup: IntlRouteGroup,
  defaultRoute: string,
): ComponentType => {
  const { publicRuntimeConfig } = getConfig()
  const { defaultLocale } = publicRuntimeConfig

  const WithIntlProxyWrapper = (props: Record<string, unknown>): ReactElement => {
    const router = useRouter()
    const locale = ((router.locale as unknown) as Locale) || defaultLocale
    const localizedRoute = routeGroup[locale] || defaultRoute || router.pathname

    if (isBrowser()) {
      router.push(localizedRoute)
      return <></>
    }

    return <WrappedComponent {...props} />
  }

  WithIntlProxyWrapper.getInitialProps = async (
    ctx: NextPageContext,
  ): Promise<Record<string, unknown> | undefined> => {
    const accept = accepts(ctx.req as IncomingMessage)
    const locale = ((accept.language(SUPPORTED_LOCALES) as unknown) as Locale) || defaultLocale
    const localizedRoute = routeGroup[locale] || defaultRoute || ctx.pathname
    const redirected = ctx.res?.hasHeader('Location') || true

    if (!isBrowser() && ctx.res && !redirected) {
      ctx.res.writeHead(302, { Location: localizedRoute })
      ctx.res.end()
    }

    const props = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))

    return { ...props }
  }

  return WithIntlProxyWrapper
}

export default withIntlProxy
