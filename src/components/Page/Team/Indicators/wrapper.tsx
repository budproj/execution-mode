import { Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import IndicatorsAccordion from 'src/components/Team/IndicatorsAccordion/wrapper'

import messages from './messages'

interface TeamIndicatorsProperties {
  teamID: string
}

export const TeamIndicators = ({ teamID }: TeamIndicatorsProperties) => {
  const intl = useIntl()

  return (
    <Stack>
      <Text fontSize={16} fontWeight={700} color="gray.500" textTransform="uppercase">
        {intl.formatMessage(messages.sectionTitle)}
      </Text>
      <IndicatorsAccordion teamID={teamID} />
    </Stack>
  )
}
