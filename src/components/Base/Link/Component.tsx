import NextLink from 'next/link'
import React, { ReactElement } from 'react'

import { useLocalizedPath } from 'state/hooks'

export interface LinkProps {
  children: ReactElement | string
  href: string
  locale?: Locale
}

const Link = (props: LinkProps): ReactElement => {
  const localizedPath = useLocalizedPath(props.href, props.locale)

  return <NextLink href={localizedPath}>{props.children}</NextLink>
}

export default Link
