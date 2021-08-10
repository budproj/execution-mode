import { IconButton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { ChevronDown } from 'src/components/Icon'

import messages from './messages'

type ToggleCollapseProperties = {
  isOpen: boolean
  onToggle: () => void
}

export const ToggleCollapse = ({ onToggle, isOpen }: ToggleCollapseProperties) => {
  const intl = useIntl()

  return (
    <IconButton
      aria-label={intl.formatMessage(messages.collapseButtonDesc)}
      h="auto"
      icon={
        <ChevronDown
          desc={intl.formatMessage(messages.collapseButtonDesc)}
          transition="all .2s ease-in-out"
          transform={isOpen ? 'rotate(180deg)' : ''}
        />
      }
      onClick={onToggle}
    />
  )
}
