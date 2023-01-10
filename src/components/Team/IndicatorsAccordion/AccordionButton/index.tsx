import { AccordionButton, AccordionIcon, Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { TeamIcon } from 'src/components/Icon'

import messages from './messages'

const IndicatorsAccordionButton = () => {
  const intl = useIntl()

  return (
    <AccordionButton display="flex" justifyContent="space-between" width="100%">
      <Flex>
        <TeamIcon
          desc={intl.formatMessage(messages.icon)}
          h="1.4em"
          w="1.4em"
          fill="none"
          stroke="none"
        />
        <VStack textAlign="left">
          <Text color="new-gray.900" fontSize={18} fontWeight="medium">
            {intl.formatMessage(messages.title)}
          </Text>
          <Text color="new-gray.700" fontSize={14}>
            {intl.formatMessage(messages.subtitle)}
          </Text>
        </VStack>
      </Flex>

      <AccordionIcon />
    </AccordionButton>
  )
}

export default IndicatorsAccordionButton
