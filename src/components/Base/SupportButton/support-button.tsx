import { IconButton } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { useIntl } from 'react-intl'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import BuoyIcon from 'src/components/Icon/Buoy'

import { HELPDESK_URL } from './constants'
import messages from './messages'

const SupportButton = () => {
  const intl = useIntl()

  return (
    <Link href={HELPDESK_URL} target="_blank">
      <TooltipWithDelay label={intl.formatMessage(messages.tooltip)}>
        <IconButton
          aria-label={intl.formatMessage(messages.iconDesc)}
          h={8}
          minH={8}
          minW={8}
          icon={
            <BuoyIcon
              fill="gray.500"
              stroke="gray.500"
              w="22px"
              h="auto"
              desc={intl.formatMessage(messages.iconDesc)}
            />
          }
          borderRadius="full"
          _hover={{
            bg: 'gray.50',
          }}
        />
      </TooltipWithDelay>
    </Link>
  )
}

export default SupportButton
