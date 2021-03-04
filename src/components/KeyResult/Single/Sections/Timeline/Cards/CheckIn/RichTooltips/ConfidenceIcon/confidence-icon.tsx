import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'

import messages from './messages'

export interface KeyResultSectionTimelineCardCheckInConfidenceIconTooltipWithRichTextProperties {
  currentConfidence: KeyResultCheckIn['value']
  parentConfidence: KeyResultCheckIn['value']
}

const KeyResultSectionTimelineCardCheckInConfidenceIconTooltipWithRichText = ({
  currentConfidence,
  parentConfidence,
}: KeyResultSectionTimelineCardCheckInConfidenceIconTooltipWithRichTextProperties) => {
  const [currentConfidenceTag] = useConfidenceTag(currentConfidence)
  const [parentConfidenceTag] = useConfidenceTag(parentConfidence)
  const intl = useIntl()

  return (
    <Box pb={2} pt={1}>
      <Text>{intl.formatMessage(messages.introduction)}</Text>

      <Text>
        {intl.formatMessage(messages.firstLine, {
          confidence: parentConfidenceTag.messages.long,
          highlight: (value: string) => (
            <Text color={parentConfidenceTag.color.primary} as="span" textTransform="uppercase">
              {value}
            </Text>
          ),
        })}
      </Text>

      <Text>
        {intl.formatMessage(messages.secondLine, {
          confidence: currentConfidenceTag.messages.long,
          highlight: (value: string) => (
            <Text color={currentConfidenceTag.color.primary} as="span" textTransform="uppercase">
              {value}
            </Text>
          ),
        })}
      </Text>
    </Box>
  )
}

KeyResultSectionTimelineCardCheckInConfidenceIconTooltipWithRichText.defaultProps = {
  currentConfidence: 100,
  parentConfidence: 100,
}

export default KeyResultSectionTimelineCardCheckInConfidenceIconTooltipWithRichText
