import { Box, Heading, HeadingProps, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import {
  CONFIDENCE_BARRIER,
  CONFIDENCE_HIGH,
  CONFIDENCE_LOW,
  CONFIDENCE_MEDIUM,
} from 'src/state/hooks/useConfidenceTag/hook'

import messages from './messages'

const TooltipHeading = (properties: HeadingProps) => (
  <Heading
    as="h3"
    fontSize="sm"
    pt={4}
    textTransform="uppercase"
    fontWeight={500}
    {...properties}
  />
)

const CycleListHeadTooltipWithRichTextsConfidenceLevel = () => {
  const intl = useIntl()
  const [highConfidenceTag] = useConfidenceTag(CONFIDENCE_HIGH.max)
  const [mediumConfidenceTag] = useConfidenceTag(CONFIDENCE_MEDIUM.max)
  const [lowConfidenceTag] = useConfidenceTag(CONFIDENCE_LOW.max)
  const [barrierConfidenceTag] = useConfidenceTag(CONFIDENCE_BARRIER.max)

  return (
    <Box pb={2}>
      <Text>{intl.formatMessage(messages.introduction)}</Text>

      <TooltipHeading color={highConfidenceTag.color.primary}>
        {highConfidenceTag.messages.long}:
      </TooltipHeading>
      <Text>{highConfidenceTag.messages.helper}</Text>

      <TooltipHeading color={mediumConfidenceTag.color.primary}>
        {mediumConfidenceTag.messages.long}:
      </TooltipHeading>
      <Text>{mediumConfidenceTag.messages.helper}</Text>

      <TooltipHeading color={lowConfidenceTag.color.primary}>
        {lowConfidenceTag.messages.long}:
      </TooltipHeading>
      <Text>{lowConfidenceTag.messages.helper}</Text>

      <TooltipHeading color={barrierConfidenceTag.color.primary}>
        {barrierConfidenceTag.messages.long}:
      </TooltipHeading>
      <Text>{barrierConfidenceTag.messages.helper}</Text>
    </Box>
  )
}

export default CycleListHeadTooltipWithRichTextsConfidenceLevel
