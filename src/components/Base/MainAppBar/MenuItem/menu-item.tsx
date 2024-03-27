import { Tag } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import IntlLink from 'src/components/Base/IntlLink'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

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
  const { dispatch } = useEvent(EventType.MAIN_MENU_TABS_CLICK)

  const handleClick = () => {
    dispatch({})
    if (onClick) {
      onClick()
    }
  }

  return (
    <IntlLink href={href} onClick={() => console.log('ccccccccccc')}>
      <ButtonActivableByURL
        id={href === '/explore' ? 'explore-navbar' : undefined}
        href={href}
        variant="text"
        colorScheme="brand"
        color="gray.400"
        _active={{
          color: 'brand.500',
        }}
        onClick={handleClick}
      >
        {label}
        {isNew && (
          <Tag
            size="sm"
            variant="solid"
            colorScheme="brand"
            ml={1}
            onClick={() => console.log('abbbbbbbbbb')}
          >
            {intl.formatMessage(messages.newItem)}
          </Tag>
        )}
      </ButtonActivableByURL>
    </IntlLink>
  )
}

export default MenuItem
