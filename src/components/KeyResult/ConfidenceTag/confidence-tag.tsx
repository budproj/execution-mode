import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import CircleIcon from 'src/components/Icon/Circle'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'

export interface ConfidenceTagProperties {
  confidenceValue?: KeyResultCheckIn['confidence']
}

const ConfidenceTag = ({ confidenceValue }: ConfidenceTagProperties) => {
  const [confidenceTag, setConfidence] = useConfidenceTag(confidenceValue)

  useEffect(() => {
    if (typeof confidenceValue !== 'undefined') setConfidence(confidenceValue)
  }, [confidenceValue, setConfidence])

  return (
    <Flex gridGap={4} alignItems="center">
      <CircleIcon fill={confidenceTag.colors.primary} desc={confidenceTag.messages.icon} />
      <Text>{confidenceTag.messages.short}</Text>
    </Flex>
  )
}

export default ConfidenceTag
