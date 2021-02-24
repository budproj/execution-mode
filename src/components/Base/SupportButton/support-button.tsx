import { IconButton } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { useIntl } from 'react-intl'

import InfoCircleIcon from 'src/components/Icon/InfoCircle'

import { HELPDESK_URL } from './constants'
import messages from './messages'

const SupportButton = () => {
  const intl = useIntl()

  return (
    <Link href={HELPDESK_URL}>
      <a target="_blank">
        <IconButton
          aria-label={intl.formatMessage(messages.iconDesc)}
          h={8}
          minH={8}
          minW={8}
          icon={
            <InfoCircleIcon
              fill="gray.500"
              stroke="gray.500"
              w={5}
              h="auto"
              title={intl.formatMessage(messages.iconTitle)}
              desc={intl.formatMessage(messages.iconDesc)}
            />
          }
          borderRadius="full"
          _hover={{
            bg: 'gray.50',
          }}
        />
      </a>
    </Link>
  )
}

export default SupportButton
