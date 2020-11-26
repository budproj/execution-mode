import Link, { LinkProps } from 'next/link'
import React, { ReactElement, forwardRef, RefObject, MouseEvent } from 'react'
import { useRecoilValue } from 'recoil'

import { intlRouteAtom } from 'state/recoil/intl'

export interface IntlLinkProperties extends LinkProps {
  href: string
  children: ReactElement | string
}

export interface ReferenceWrapperProperties {
  href?: IntlLinkProperties['href']
  children?: IntlLinkProperties['children']
  onClick?: (event: MouseEvent<HTMLAnchorElement> | MouseEvent) => void
}

const ReferenceWrapper = forwardRef(
  (
    { onClick, href, children }: ReferenceWrapperProperties,
    reference: RefObject<HTMLAnchorElement>,
  ) => (
    <a ref={reference} href={href} onClick={onClick}>
      {children}
    </a>
  ),
)

const IntlLink = ({ href, children, ...rest }: IntlLinkProperties): ReactElement => {
  const intlRoute = useRecoilValue(intlRouteAtom(href))
  console.log(href)

  return (
    <Link passHref href={href} as={intlRoute} {...rest}>
      <ReferenceWrapper>{children}</ReferenceWrapper>
    </Link>
  )
}

export default IntlLink
