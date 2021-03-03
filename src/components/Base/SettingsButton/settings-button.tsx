import { IconButton, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import GearIcon from 'src/components/Icon/Gear'

import IntlLink from '../IntlLink'

import messages from './messages'

const SupportButton = () => {
  const intl = useIntl()

  return (
    <IntlLink href="/settings/my-account">
      <Tooltip label={intl.formatMessage(messages.tooltip)}>
        <IconButton
          aria-label={intl.formatMessage(messages.iconDesc)}
          h={8}
          minH={8}
          minW={8}
          icon={
            <GearIcon fill="gray.500" w={5} h="auto" desc={intl.formatMessage(messages.iconDesc)} />
          }
          borderRadius="full"
          _hover={{
            bg: 'gray.50',
          }}
        />
      </Tooltip>
    </IntlLink>
  )
}

export default SupportButton
