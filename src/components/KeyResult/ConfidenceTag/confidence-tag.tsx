import { Tag } from '@chakra-ui/react'
import React, { useEffect } from 'react'

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
    <Tag
      colorScheme={confidenceTag.color.scheme}
      textTransform="uppercase"
      fontSize="xs"
      p={2}
      borderRadius={4}
      color={confidenceTag.color.primary}
      bg={confidenceTag.color.light}
    >
      {confidenceTag.messages.long}
    </Tag>
  )
}

export default ConfidenceTag
