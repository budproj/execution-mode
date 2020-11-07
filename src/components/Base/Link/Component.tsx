import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import { intlRoute as intlRouteAtom } from 'state/recoil/intl/route'

export interface LinkProps extends NextLinkProps {
  href: string
  children: ReactElement | string
}

const Link = ({ href, children, ...rest }: LinkProps): ReactElement => {
  const intlRoute = useRecoilValue(intlRouteAtom(href))

  return (
    <NextLink href={intlRoute} {...rest}>
      <>{children}</>
      {/* Do not remove the <> fragment. It is a workaroung regarding the warning regarding NextJS Link passing ref to function component. Ref: https://github.com/vercel/next.js/issues/7915#issuecomment-573397162 */}
    </NextLink>
  )
}

export default Link
