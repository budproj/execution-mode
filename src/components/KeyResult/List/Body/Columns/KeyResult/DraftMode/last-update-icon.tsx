import { Flex, useToken } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import LastUpdateText from 'src/components/Base/LastUpdateText'
import { Clock } from 'src/components/Icon'

import messages from './messages'

export interface LastUpdateBadgeProperties {
  lastUpdateDate?: Date
}

export const LastUpdateBadge = ({ lastUpdateDate }: LastUpdateBadgeProperties) => {
  const intl = useIntl()
  const [updateTextColorToken] = useToken('colors', ['new-gray.700'])
  const [fillColorToken] = useToken('colors', ['new-gray.300'])

  return (
    <Flex alignItems="center">
      <Clock
        desc={intl.formatMessage(messages.lastUpdateIconDescription)}
        width="12px"
        height="12px"
        fill={fillColorToken}
        stroke={updateTextColorToken}
        mr={1}
      />
      <LastUpdateText color="new-gray.700" date={lastUpdateDate} prefix="Última edição feita" />
    </Flex>
  )
}
