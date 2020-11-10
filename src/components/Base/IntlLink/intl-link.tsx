import Link, { LinkProps } from 'next/link'
import React, { ReactElement, forwardRef, RefObject, MouseEvent } from 'react'
import { useRecoilValue } from 'recoil'

import { intlRoute as intlRouteAtom } from 'state/recoil/intl/route'

export interface IntlLinkProps extends LinkProps {
  href: string
  children: ReactElement | string
}

export interface RefWrapperProps {
  href?: IntlLinkProps['href']
  children?: IntlLinkProps['children']
  onClick?: (event: MouseEvent<HTMLAnchorElement> | MouseEvent) => void
}

const RefWrapper = forwardRef(
  ({ onClick, href, children }: RefWrapperProps, ref: RefObject<HTMLAnchorElement>) => (
    <a ref={ref} href={href} onClick={onClick}>
      {children}
    </a>
  ),
)

const IntlLink = ({ href, children, ...rest }: IntlLinkProps): ReactElement => {
  const intlRoute = useRecoilValue(intlRouteAtom(href))

  return (
    <Link passHref href={href} as={intlRoute} {...rest}>
      <RefWrapper>{children}</RefWrapper>
    </Link>
  )
}

export default IntlLink
