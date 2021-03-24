import React from 'react'

import IntlLink, { IntlLinkProperties } from 'src/components/Base/IntlLink'

import ButtonActivableByURL from '../ButtonActivableByURL'

export interface RouteTabProperties {
  href: IntlLinkProperties['href']
  children: IntlLinkProperties['children']
}

const RouteTab = ({ href, children }: RouteTabProperties) => (
  <IntlLink href={href}>
    <ButtonActivableByURL
      href={href}
      p={4}
      borderWidth={2}
      fontWeight={500}
      borderColor="transparent"
      borderRadius="none"
      color="gray.400"
      _active={{
        borderBottomWidth: 2,
        borderBottomColor: 'blue.500',
        color: 'gray.500',
      }}
      _hover={{
        borderBottomWidth: 2,
        borderBottomColor: 'blue.500',
        color: 'blue.500',
      }}
    >
      {children}
    </ButtonActivableByURL>
  </IntlLink>
)

export default RouteTab
