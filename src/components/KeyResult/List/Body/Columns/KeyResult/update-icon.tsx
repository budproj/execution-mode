import { useToken } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { Check, Clock } from 'src/components/Icon'

import messages from './messages'

export interface UpdateIconProperties {
  isOutdated: boolean | undefined
  updateTextColor: string
}

export const UpdateIcon = ({ isOutdated, updateTextColor }: UpdateIconProperties) => {
  const intl = useIntl()
  const [updateTextColorToken] = useToken('colors', [updateTextColor])

  return isOutdated ? (
    <Clock
      desc={intl.formatMessage(messages.outdatedUpdateIconDescription)}
      width="12px"
      height="12px"
      fill="transparent"
      stroke={updateTextColorToken}
      mr={1}
    />
  ) : (
    <Check
      desc={intl.formatMessage(messages.upToDateUpdateIconDescription)}
      fill={updateTextColorToken}
    />
  )
}
