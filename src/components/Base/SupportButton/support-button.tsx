import { IconButton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import InfoCircleIcon from 'src/components/Icon/InfoCircle'

import messages from './messages'

const redirectToSupport = () => {
  window.location.href = 'https://getbud.atlassian.net/servicedesk/customer/portals'
}

const SupportButton = () => {
  const intl = useIntl()

  return (
    <IconButton
      aria-label={intl.formatMessage(messages.iconDesc)}
      icon={
        <InfoCircleIcon
          fill="uniqueGray.400"
          stroke="uniqueGray.400"
          fontSize="2xl"
          title={intl.formatMessage(messages.iconTitle)}
          desc={intl.formatMessage(messages.iconDesc)}
        />
      }
      borderRadius="full"
      _hover={{
        bg: 'brand.50',
      }}
      onClick={redirectToSupport}
    />
  )
}

export default SupportButton
