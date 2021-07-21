import { Link } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import ReactLinkify from 'react-linkify'

type LinkifyProperties = {
  children: ReactNode
}

export const Linkify = (properties: LinkifyProperties) => {
  const componentDecorator = (href: string, text: string, key: number) => (
    <Link key={key} href={href} target="blank" onClick={(event) => event.stopPropagation()}>
      {text}
    </Link>
  )

  return <ReactLinkify componentDecorator={componentDecorator} {...properties} />
}
