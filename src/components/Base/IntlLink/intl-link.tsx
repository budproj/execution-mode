import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement, forwardRef, RefObject, MouseEvent } from 'react'

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

  const isHrefAbsolute = href?.startsWith('/') || href?.startsWith('http')
  const absoluteHref = isHrefAbsolute ? href : [router.pathname, href].join('/')

  return (
    <Link passHref href={absoluteHref} as={href} {...rest}>
      <ReferenceWrapper>{children}</ReferenceWrapper>
    </Link>
  )
}

export default IntlLink
