import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

import { ConfidenceTag } from 'src/state/hooks/useConfidenceTag/hook'

export interface ConfidenceTagTooltipWithRichTextProperties {
  confidenceTag: ConfidenceTag
}

const ConfidenceTagTooltipWithRichText = ({
  confidenceTag,
}: ConfidenceTagTooltipWithRichTextProperties) => (
  <Box py={2}>
    <Heading
      as="h3"
      fontSize="sm"
      textTransform="uppercase"
      fontWeight={400}
      color={confidenceTag.color.primary}
    >
      {confidenceTag.messages.long}
    </Heading>
    <Text>{confidenceTag.messages.helper}</Text>
  </Box>
)

export default ConfidenceTagTooltipWithRichText
