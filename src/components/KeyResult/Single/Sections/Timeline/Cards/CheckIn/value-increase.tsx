import { Box, Divider, Flex, Heading, Text, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import useValueSignal from 'src/state/hooks/useValueSignal'
import { COLOR_SCHEME_HASHMAP, SIGNAL } from 'src/state/hooks/useValueSignal/constants'
import { COLOR_SCHEME } from 'src/themes/tokens'

import { KEY_RESULT_TYPE } from '../../../../../constants'

import { BORDER_COLOR } from './constants'
import messages from './messages'
import KeyResultSectionTimelineCardCheckInRelativeConfidenceTag from './relative-confidence-tag'

export interface KeyResultSectionTimelineCardCheckInValueIncreaseProperties {
  format?: KeyResult['format']
  confidence?: number
  parentConfidence?: number
  valueIncrease?: KeyResultCheckIn['valueIncrease']
  type?: KEY_RESULT_TYPE
}

const customColorScheme: typeof COLOR_SCHEME_HASHMAP = {
  ...COLOR_SCHEME_HASHMAP,
  [SIGNAL.POSITIVE]: COLOR_SCHEME.BRAND,
}

const KeyResultSectionTimelineCardCheckInValueIncrease = ({
  format,
  confidence,
  parentConfidence,
  valueIncrease,
  type,
}: KeyResultSectionTimelineCardCheckInValueIncreaseProperties) => {
  const intl = useIntl()
  const [previousValueIncrease, setValueIncrease, signalAttributes] = useValueSignal(
    valueIncrease,
    customColorScheme,
    {
      type,
    },
  )

  const Mask = selectMaskBasedOnFormat(format)
  const absoluteValueIncrease = Math.abs(valueIncrease ?? 0)
  const isLoaded = Boolean(valueIncrease) || valueIncrease === 0

  useEffect(() => {
    if (valueIncrease && valueIncrease !== previousValueIncrease) setValueIncrease(valueIncrease)
  }, [previousValueIncrease, valueIncrease, setValueIncrease])

  return (
    <Box>
      <Divider borderColor={BORDER_COLOR} />
      <Flex borderColor={BORDER_COLOR} pt={4} gridGap={8}>
        <Flex gridGap={1} direction="column" grow={1}>
          <Heading
            as="h4"
            fontWeight={700}
            fontSize="xs"
            color="gray.300"
            textTransform="uppercase"
            pb={2}
          >
            {intl.formatMessage(messages.valueIncreaseLeftColumnTitle)}
          </Heading>

          <Skeleton isLoaded={isLoaded}>
            <Text color="new-gray.800" fontSize="xl">
              {signalAttributes.indicator}
              <Mask value={absoluteValueIncrease} displayType="text" />
            </Text>
          </Skeleton>
        </Flex>

        <Box py={1}>
          <Divider orientation="vertical" borderColor={BORDER_COLOR} />
        </Box>

        <Flex gridGap={1} direction="column" grow={1}>
          <Heading
            as="h4"
            fontWeight={700}
            fontSize="xs"
            color="gray.300"
            textTransform="uppercase"
            pb={2}
          >
            {intl.formatMessage(messages.valueIncreaseRightColumnTitle)}
          </Heading>

          <Skeleton isLoaded={isLoaded}>
            <KeyResultSectionTimelineCardCheckInRelativeConfidenceTag
              currentConfidence={confidence}
              parentConfidence={parentConfidence}
            />
          </Skeleton>
        </Flex>
      </Flex>
    </Box>
  )
}

export default KeyResultSectionTimelineCardCheckInValueIncrease
