import React from 'react'

import IntlLink from 'src/components/Base/IntlLink'

import ButtonActivableByURL from '../../ButtonActivableByURL'

export interface MenuItemProperties {
  label: string
  href: string
}

const MenuItem = ({ label, href }: MenuItemProperties) => (
  <IntlLink href={href}>
    <ButtonActivableByURL
      href={href}
      variant="text"
      colorScheme="brand"
      color="gray.400"
      _active={{
        color: 'brand.500',
      }}
    >
      {label}
    </ButtonActivableByURL>
  </IntlLink>
)

export default MenuItem
