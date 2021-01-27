import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import CircleIcon from 'src/components/Icon/Circle'
import confidenceTagSelector from 'src/state/recoil/key-result/selectors/confidence-tag'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'

export interface ConfidenceTagProperties {
  confidenceValue?: KeyResultCheckIn['confidence']
}

const ConfidenceTag = ({ confidenceValue }: ConfidenceTagProperties) => {
  const intl = useIntl()
  const confidenceTag = useRecoilValue(confidenceTagSelector(confidenceValue))

  return (
    <Flex gridGap={4} alignItems="center">
      <CircleIcon fill={confidenceTag.color} desc={intl.formatMessage(confidenceTag.desc)} />
      <Text>{intl.formatMessage(confidenceTag.message)}</Text>
    </Flex>
  )
}

export default ConfidenceTag
