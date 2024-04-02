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
  const { dispatch: dispatchPanel } = useEvent(EventType.MAIN_MENU_TABS_PANEL_CLICK)
  const { dispatch: dispatchMythings } = useEvent(EventType.MAIN_MENU_TABS_MY_THINGS_CLICK)
  const { dispatch: dispatchTeams } = useEvent(EventType.MAIN_MENU_TABS_TEAMS_CLICK)

  const dispatchMap = new Map([
    [intl.formatMessage(messages.firstMenuItem), dispatchPanel],
    [intl.formatMessage(messages.secondMenuItem), dispatchMythings],
    [intl.formatMessage(messages.thirdMenuItem), dispatchTeams],
  ])

  const handleClick = () => {
    const dispatch = dispatchMap.get(label)

    if (dispatch) {
      dispatch({})
    }

    if (onClick) {
      onClick()
    }
  }

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
        onClick={handleClick}
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
