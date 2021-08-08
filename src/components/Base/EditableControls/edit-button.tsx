import { ButtonProps, IconButton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import PenIcon from 'src/components/Icon/Pen'

import messages from './messages'

interface EditButtonProperties extends ButtonProps {
  isHovering?: boolean
  isLocked?: boolean
}

export const EditButton = ({ isHovering, isLocked, ...rest }: EditButtonProperties) => {
  const intl = useIntl()

  return (
    <IconButton
      aria-label={intl.formatMessage(messages.editableIconDesc)}
      icon={
        <PenIcon
          fill="brand.400"
          opacity={isHovering && !isLocked ? 1 : 0}
          display={isLocked ? 'none' : 'inherit'}
          transition="opacity .2s ease-out"
          desc={intl.formatMessage(messages.editableIconDesc)}
          title={intl.formatMessage(messages.editableIconTitle)}
        />
      }
      {...rest}
      p={0}
      minW="auto"
      w="auto"
      h="auto"
    />
  )
}
