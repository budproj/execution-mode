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
          icon={
            <InfoCircleIcon
              fill="gray.400"
              stroke="gray.400"
              fontSize="2xl"
              title={intl.formatMessage(messages.iconTitle)}
              desc={intl.formatMessage(messages.iconDesc)}
            />
          }
          borderRadius="full"
          _hover={{
            bg: 'brand.50',
          }}
        />
      </a>
    </Link>
  )
}

export default SupportButton
