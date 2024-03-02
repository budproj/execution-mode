import { Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { KEY_RESULT_PATCHS_KEYS } from 'src/components/KeyResult/constants'
import { KeyResultPatchInterface } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'

import messages from './messages'

export interface KeyResultSectionTimelineCardUpdateProperties {
  readonly patche: KeyResultPatchInterface
  readonly userName?: User['fullName']
}

const KeyResultSectionTimelineLine = ({
  patche,
  userName,
}: KeyResultSectionTimelineCardUpdateProperties) => {
  const intl = useIntl()

  return (
    <Text
      lineHeight="14px"
      noOfLines={1}
      w="max-content"
      fontWeight={patche.key === KEY_RESULT_PATCHS_KEYS.mode ? 'bold' : 'normal'}
      color={patche.key === KEY_RESULT_PATCHS_KEYS.mode ? 'brand.500' : 'new-gray.900'}
      fontSize={14}
    >
      {patche.key === KEY_RESULT_PATCHS_KEYS.mode
        ? intl.formatMessage(messages.updateKrModeCard)
        : intl.formatMessage(messages.updatedDataCard, {
            user: userName,
            key: patche.key,
            value: patche.value,
          })}
    </Text>
  )
}

export default KeyResultSectionTimelineLine
