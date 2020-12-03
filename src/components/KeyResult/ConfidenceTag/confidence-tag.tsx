import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import CircleIcon from 'src/components/Icons/Circle'
import { ConfidenceReport } from 'src/components/KeyResult/types'
import confidenceTagSelector from 'src/state/recoil/key-result/selectors/confidence-tag'

export interface ConfidenceTagProperties {
  confidenceValue?: ConfidenceReport['valueNew']
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
