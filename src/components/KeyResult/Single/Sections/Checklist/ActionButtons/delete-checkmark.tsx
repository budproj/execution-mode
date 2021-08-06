import { IconButton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TimesIcon from 'src/components/Icon/Times'

import messages from './messages'

interface DeleteCheckMarkButtonProperties {
  keyResultID?: string
  refresh?: () => void
  isVisible?: boolean
}

export const DeleteCheckMarkButton = ({
  keyResultID,
  refresh,
  isVisible,
}: DeleteCheckMarkButtonProperties) => {
  isVisible ??= true

  const intl = useIntl()

  return isVisible ? (
    <IconButton
      aria-label={intl.formatMessage(messages.removeIconDescription)}
      bg="new-gray.600"
      borderRadius="full"
      h="auto"
      minW="auto"
      p={1}
      _hover={{ bg: 'new-gray.800' }}
      icon={
        <TimesIcon
          desc={intl.formatMessage(messages.removeIconDescription)}
          fill="white"
          stroke="white"
          fontSize="xs"
        />
      }
    />
  ) : // eslint-disable-next-line unicorn/no-null
  null
}
