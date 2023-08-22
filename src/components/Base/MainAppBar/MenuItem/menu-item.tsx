import { Tag } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import IntlLink from 'src/components/Base/IntlLink'

import ButtonActivableByURL from '../../ButtonActivableByURL'
import messages from '../messages'

export interface MenuItemProperties {
  label: string
  href: string
  isNew?: boolean
  onClick?: () => void
}

const MenuItem = ({ label, href, isNew, onClick }: MenuItemProperties) => {
  const intl = useIntl()
  return (
    <IntlLink href={href}>
      <ButtonActivableByURL
        id={href === '/explore' ? 'explore-navbar' : undefined}
        href={href}
        variant="text"
        colorScheme="brand"
        color="gray.400"
        _active={{
          color: 'brand.500',
        }}
        onClick={onClick}
      >
        {label}
        {isNew && (
          <Tag size="sm" variant="solid" colorScheme="brand" ml={1}>
            {intl.formatMessage(messages.newItem)}
          </Tag>
        )}
      </ButtonActivableByURL>
    </IntlLink>
  )
}

export default MenuItem
