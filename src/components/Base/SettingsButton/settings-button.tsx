import { IconButton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import IntlLink from 'src/components/Base/IntlLink'
import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import GearIcon from 'src/components/Icon/Gear'

import messages from './messages'

const SupportButton = () => {
  const intl = useIntl()

  return (
    <IntlLink href="/settings/my-profile">
      <TooltipWithDelay label={intl.formatMessage(messages.tooltip)}>
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
      </TooltipWithDelay>
    </IntlLink>
  )
}

export default SupportButton
