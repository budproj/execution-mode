import React, { ReactElement } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { selectLocalizedHref } from './selectors'

import getConfig, { Locale } from 'config'

export interface LinkProps {
  children: ReactElement | string
  href: string
  locale?: Locale
}

const Link = (props: LinkProps): ReactElement => {
  const { publicRuntimeConfig } = getConfig()
  const { intlRoutes } = publicRuntimeConfig
  const router = useRouter()
  const locale = props.locale || router.locale || publicRuntimeConfig.defaultLocale
  const localizedHref = selectLocalizedHref(props.href, { locale, intlRoutes })

  return <NextLink href={localizedHref}>{props.children}</NextLink>
}

export default Link
