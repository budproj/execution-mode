import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement, forwardRef, RefObject, MouseEvent } from 'react'
import { useRecoilValue } from 'recoil'

import { selectRouteBasedOnLocale } from 'src/state/recoil/intl/selectors'

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
    reference:
      | string
      | ((instance: HTMLAnchorElement | null) => void)
      | RefObject<HTMLAnchorElement>
      | null,
  ) => (
    <a ref={reference} href={href} onClick={onClick}>
      {children}
    </a>
  ),
)

const IntlLink = ({ href, children, ...rest }: IntlLinkProperties) => {
  const router = useRouter()
  const intlRouteSelector = selectRouteBasedOnLocale(href)
  const intlRoute = useRecoilValue(intlRouteSelector)

  const isHrefAbsolute = href?.startsWith('/') || href?.startsWith('http')
  const absoluteHref = isHrefAbsolute ? href : [router.pathname, href].join('/')

  return (
    <Link passHref href={absoluteHref} as={intlRoute} {...rest}>
      <ReferenceWrapper>{children}</ReferenceWrapper>
    </Link>
  )
}

export default IntlLink
