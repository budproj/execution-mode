import { IncomingMessage } from 'http'

import React, { ComponentType, ReactElement } from 'react'
import { useRouter } from 'next/router'
import { NextComponentType, NextPageContext } from 'next'
import accepts from 'accepts'

import { IntlRouteGroup } from './types'
import { SUPPORTED_LOCALES } from './constants'

import isBrowser from 'specifications/isBrowser'
import getConfig, { Locale } from 'config'
import routeGroups from 'intlRouteGroups.json'

const withIntlProxy = (
  WrappedComponent: NextComponentType,
  routeGroupKey: string,
): ComponentType => {
  const { publicRuntimeConfig } = getConfig()
  const { defaultLocale } = publicRuntimeConfig
  const routeGroup: IntlRouteGroup = routeGroups[routeGroupKey]

  const WithIntlProxyWrapper = (props: Record<string, unknown>): ReactElement => {
    const router = useRouter()
    const locale = ((router.locale as unknown) as Locale) || defaultLocale
    const localizedRoute = routeGroup[locale] || router.pathname

    if (isBrowser()) {
      router.push(localizedRoute)
    }

    return <WrappedComponent {...props} />
  }

  WithIntlProxyWrapper.getInitialProps = async (
    ctx: NextPageContext,
  ): Promise<Record<string, unknown> | undefined> => {
    const accept = accepts(ctx.req as IncomingMessage)
    const locale = ((accept.language(SUPPORTED_LOCALES) as unknown) as Locale) || defaultLocale
    const localizedRoute = routeGroup[locale] || ctx.pathname
    const headersSent = ctx.res?.headersSent
    const isInLocalizedRoute = ctx.req?.url === localizedRoute

    console.log(headersSent)

    if (!isBrowser() && ctx.res && !headersSent && !isInLocalizedRoute) {
      ctx.res.writeHead(302, { Location: localizedRoute })
      ctx.res.end()
    }

    const props = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))

    return { ...props }
  }

  return WithIntlProxyWrapper
}

export default withIntlProxy
