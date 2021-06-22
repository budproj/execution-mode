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
  isDisabled?: boolean
}

const ConfidenceTag = ({
  confidenceValue,
  showHelperText,
  showTooltip,
  isDisabled,
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
          colorScheme={isDisabled ? 'gray' : confidenceTag.color.scheme}
          textTransform="uppercase"
          fontSize="xs"
          p={2}
          borderRadius={4}
          bg={isDisabled ? 'gray.50' : confidenceTag.color.light}
          color={isDisabled ? 'gray.400' : confidenceTag.color.primary}
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
