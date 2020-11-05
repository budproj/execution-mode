import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import React, { ReactElement } from 'react'

import { Locale } from 'config'
import { useLocalizedPath } from 'state/hooks'

export interface LinkProps extends NextLinkProps {
  children: ReactElement | string
  href: string
  locale?: Locale
}

const Link = ({ href, locale, children, ...rest }: LinkProps): ReactElement => {
  const localizedPath = useLocalizedPath(href, locale)

  return (
    <NextLink href={localizedPath} {...rest}>
      <>{children}</>
      {/* Do not remove the <> fragment. It is a workaroung regarding the warning regarding NextJS Link passing ref to function component. Ref: https://github.com/vercel/next.js/issues/7915#issuecomment-573397162 */}
    </NextLink>
  )
}

export default Link
