import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import { SIGNAL } from 'src/components/Report/CompanyProgressOverview/Body/Stamps/ProgressIncrease/constants'
import useValueSignal from 'src/state/hooks/useValueSignal'
import { COLOR_SCHEME_HASHMAP } from 'src/state/hooks/useValueSignal/constants'
import { ColorScheme } from 'src/themes/tokens'

import { BORDER_COLOR } from './constants'
import messages from './messages'

export interface KeyResultSectionTimelineCardCheckInValueIncreaseProperties {
  format?: KeyResult['format']
  value?: KeyResultCheckIn['value']
  valueIncrease?: KeyResultCheckIn['valueIncrease']
}

const customColorScheme: typeof COLOR_SCHEME_HASHMAP = {
  ...COLOR_SCHEME_HASHMAP,
  [SIGNAL.POSITIVE]: ColorScheme.BRAND,
}

const KeyResultSectionTimelineCardCheckInValueIncrease = ({
  format,
  value,
  valueIncrease,
}: KeyResultSectionTimelineCardCheckInValueIncreaseProperties) => {
  const intl = useIntl()
  const [previousValue, setValue, signalAttributes] = useValueSignal(value, customColorScheme)

  const Mask = selectMaskBasedOnFormat(format)
  const absoluteValue = Math.abs(value ?? 0)
  const highlightColor = `${signalAttributes.colorScheme}.500`

  useEffect(() => {
    if (value && value !== previousValue) setValue(value)
  }, [previousValue, value, setValue])

  return (
    <Box>
      <Divider borderColor={BORDER_COLOR} />
      <Flex borderColor={BORDER_COLOR} pt={4} gridGap={4}>
        <Flex gridGap={1} direction="column" grow={1}>
          <Heading as="h4" fontWeight={400} fontSize="sm" color="gray.400">
            {intl.formatMessage(messages.valueIncreaseLeftColumnTitle)}
          </Heading>

          <Text color={highlightColor} fontSize="xl">
            {signalAttributes.indicator}
            <Mask value={absoluteValue} displayType="text" />
          </Text>
        </Flex>

        <Box py={1}>
          <Divider orientation="vertical" borderColor={BORDER_COLOR} />
        </Box>

        <Flex gridGap={1} direction="column" grow={1}>
          <Heading as="h4" fontWeight={400} fontSize="sm" color="gray.400">
            {intl.formatMessage(messages.valueIncreaseRightColumnTitle)}
          </Heading>

          <Text color="gray.500" fontSize="xl">
            <Mask value={valueIncrease} displayType="text" />
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default KeyResultSectionTimelineCardCheckInValueIncrease
