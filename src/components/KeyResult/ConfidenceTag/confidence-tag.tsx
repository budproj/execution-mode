import { Tag, Text, Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import TooltipWithRichText from 'src/components/Base/TooltipWithRichText'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'

import ConfidenceTagTooltipWithRichText from './rich-tooltip'

export interface ConfidenceTagProperties {
  showHelperText: boolean
  showTooltip: boolean
  confidenceValue?: KeyResultCheckIn['confidence']
}

const ConfidenceTag = ({
  confidenceValue,
  showHelperText,
  showTooltip,
}: ConfidenceTagProperties) => {
  const [confidenceTag, setConfidence] = useConfidenceTag(confidenceValue)

  useEffect(() => {
    if (typeof confidenceValue !== 'undefined') setConfidence(confidenceValue)
  }, [confidenceValue, setConfidence])

  return (
    <Box>
      <TooltipWithRichText
        tooltip={<ConfidenceTagTooltipWithRichText confidenceTag={confidenceTag} />}
        display={showTooltip ? 'inherit' : 'none'}
      >
        <Tag
          colorScheme={confidenceTag.color.scheme}
          textTransform="uppercase"
          fontSize="xs"
          p={2}
          borderRadius={4}
          bg={confidenceTag.color.light}
          color={confidenceTag.color.primary}
        >
          {confidenceTag.messages.long}
        </Tag>
      </TooltipWithRichText>
      {showHelperText && (
        <Text color="gray.200" fontSize="sm" fontWeight={400} pt={2}>
          {confidenceTag.messages.helper}
        </Text>
      )}
    </Box>
  )
}

ConfidenceTag.defaultProps = {
  showHelperText: false,
  showTooltip: false,
}

export default ConfidenceTag
