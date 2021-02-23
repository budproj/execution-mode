import { Tag } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import { COLOR_SCHEME } from 'src/themes/tokens'

export interface ConfidenceTagProperties {
  confidenceValue?: KeyResultCheckIn['confidence']
  isGrayscale?: boolean
}

const ConfidenceTag = ({ confidenceValue, isGrayscale }: ConfidenceTagProperties) => {
  const [confidenceTag, setConfidence] = useConfidenceTag(confidenceValue)

  useEffect(() => {
    if (typeof confidenceValue !== 'undefined') setConfidence(confidenceValue)
  }, [confidenceValue, setConfidence])

  const textColor =
    confidenceTag.color.scheme === COLOR_SCHEME.YELLOW ? 'yellow.600' : confidenceTag.color.primary
  const bgColor = confidenceTag.color.light

  return (
    <Tag
      colorScheme={confidenceTag.color.scheme}
      textTransform="uppercase"
      fontSize="xs"
      p={2}
      borderRadius={4}
      bg={isGrayscale ? 'gray.50' : bgColor}
      color={isGrayscale ? 'gray.200' : textColor}
    >
      {confidenceTag.messages.long}
    </Tag>
  )
}

export default ConfidenceTag
