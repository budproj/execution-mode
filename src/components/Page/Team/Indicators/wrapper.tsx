import { Flex, HStack, Stack, Tag, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import newTagMessages from 'src/components/Base/MainAppBar/messages'
import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import InfoCircleIcon from 'src/components/Icon/InfoCircle'
import IndicatorsAccordion from 'src/components/Team/IndicatorsAccordion/wrapper'

import messages from './messages'

interface TeamIndicatorsProperties {
  teamID: string
}

const TeamIndicators = ({ teamID }: TeamIndicatorsProperties) => {
  const intl = useIntl()

  return (
    <Stack>
      <HStack alignItems="center">
        <Text fontSize={16} fontWeight={700} color="gray.500" textTransform="uppercase">
          {intl.formatMessage(messages.sectionTitle)}
        </Text>
        <TooltipWithDelay
          label={intl.formatMessage(messages.explainFeatureTooltipMessage)}
          placement="bottom-start"
          bg="new-gray.800"
          color="white"
          fontWeight="medium"
          maxWidth="520px"
        >
          <Flex transform="translateY(-1px)">
            <InfoCircleIcon fill="new-gray.600" stroke="new-gray.600" desc="" cursor="help" />
          </Flex>
        </TooltipWithDelay>
        <Tag size="sm" variant="solid" colorScheme="brand" ml={2}>
          {intl.formatMessage(newTagMessages.newItem)}
        </Tag>
      </HStack>
      <IndicatorsAccordion teamId={teamID} />
    </Stack>
  )
}

export default TeamIndicators
