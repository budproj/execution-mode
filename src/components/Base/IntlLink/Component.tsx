import Link, { LinkProps } from 'next/link'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import { intlRoute as intlRouteAtom } from 'state/recoil/intl/route'

export interface IntlLinkProps extends LinkProps {
  href: string
  children: ReactElement | string
}

const IntlLink = ({ href, ...rest }: IntlLinkProps): ReactElement => {
  const intlRoute = useRecoilValue(intlRouteAtom(href))

  return <Link href={href} as={intlRoute} {...rest} />
}

export default IntlLink
