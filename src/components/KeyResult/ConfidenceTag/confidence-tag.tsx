import { Tag, Text, Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import RichTooltip from 'src/components/Base/RichTooltip'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import { COLOR_SCHEME } from 'src/themes/tokens'

import ConfidenceTagRichTooltip from './rich-tooltip'

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

  const textColor =
    confidenceTag.color.scheme === COLOR_SCHEME.YELLOW ? 'yellow.600' : confidenceTag.color.primary
  const bgColor = confidenceTag.color.light

  return (
    <Box>
      <RichTooltip
        tooltip={<ConfidenceTagRichTooltip confidenceTag={confidenceTag} />}
        display={showTooltip ? 'inherit' : 'none'}
      >
        <Tag
          colorScheme={confidenceTag.color.scheme}
          textTransform="uppercase"
          fontSize="xs"
          p={2}
          borderRadius={4}
          bg={bgColor}
          color={textColor}
        >
          {confidenceTag.messages.long}
        </Tag>
      </RichTooltip>
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
