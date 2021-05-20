import { Box, Divider, Flex, Heading, Text, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import useValueSignal from 'src/state/hooks/useValueSignal'
import { COLOR_SCHEME_HASHMAP, SIGNAL } from 'src/state/hooks/useValueSignal/constants'
import { COLOR_SCHEME } from 'src/themes/tokens'

import { BORDER_COLOR } from './constants'
import messages from './messages'

export interface KeyResultSectionTimelineCardCheckInValueIncreaseProperties {
  format?: KeyResult['format']
  progress?: number
  valueIncrease?: KeyResultCheckIn['valueIncrease']
}

const customColorScheme: typeof COLOR_SCHEME_HASHMAP = {
  ...COLOR_SCHEME_HASHMAP,
  [SIGNAL.POSITIVE]: COLOR_SCHEME.BRAND,
}

const KeyResultSectionTimelineCardCheckInValueIncrease = ({
  format,
  progress,
  valueIncrease,
}: KeyResultSectionTimelineCardCheckInValueIncreaseProperties) => {
  const intl = useIntl()
  const [previousValueIncrease, setValueIncrease, signalAttributes] = useValueSignal(
    valueIncrease,
    customColorScheme,
  )

  const Mask = selectMaskBasedOnFormat(format)
  const absoluteValueIncrease = Math.abs(valueIncrease ?? 0)
  const highlightColor = `${signalAttributes.colorScheme}.500`
  const isLoaded = Boolean(valueIncrease) || valueIncrease === 0

  useEffect(() => {
    if (valueIncrease && valueIncrease !== previousValueIncrease) setValueIncrease(valueIncrease)
  }, [previousValueIncrease, valueIncrease, setValueIncrease])

  return (
    <Box>
      <Divider borderColor={BORDER_COLOR} />
      <Flex borderColor={BORDER_COLOR} pt={4} gridGap={4}>
        <Flex gridGap={1} direction="column" grow={1}>
          <Heading as="h4" fontWeight={400} fontSize="sm" color="gray.200">
            {intl.formatMessage(messages.valueIncreaseLeftColumnTitle)}
          </Heading>

          <Skeleton isLoaded={isLoaded}>
            <Text color={highlightColor} fontSize="xl">
              {signalAttributes.indicator}
              <Mask value={absoluteValueIncrease} displayType="text" />
            </Text>
          </Skeleton>
        </Flex>

        <Box py={1}>
          <Divider orientation="vertical" borderColor={BORDER_COLOR} />
        </Box>

        <Flex gridGap={1} direction="column" grow={1}>
          <Heading as="h4" fontWeight={400} fontSize="sm" color="gray.200">
            {intl.formatMessage(messages.valueIncreaseRightColumnTitle)}
          </Heading>

          <Skeleton isLoaded={isLoaded}>
            <Text color="gray.200" fontSize="xl">
              <Mask value={Math.round(progress ?? 0)} displayType="text" />
            </Text>
          </Skeleton>
        </Flex>
      </Flex>
    </Box>
  )
}

export default KeyResultSectionTimelineCardCheckInValueIncrease
