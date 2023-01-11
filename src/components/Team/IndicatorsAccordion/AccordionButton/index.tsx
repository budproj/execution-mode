import { AccordionButton, AccordionIcon, Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { OpacityTeamIcon } from 'src/components/Icon'

import messages from './messages'

const IndicatorsAccordionButton = () => {
  const intl = useIntl()

  return (
    <AccordionButton
      maxWidth="100%"
      p={0}
      gridGap={4}
      _hover={{}}
      _focus={{ boxShadow: 'none' }}
      justifyContent="space-between"
    >
      <Flex gap={4}>
        <OpacityTeamIcon desc={intl.formatMessage(messages.icon)} stroke="none" />
        <VStack alignItems="flex-start" spacing={0}>
          <Text color="new-gray.900" fontSize={18} fontWeight="medium">
            {intl.formatMessage(messages.title)}
          </Text>
          <Text color="new-gray.700" fontSize={14} textAlign="left">
            {intl.formatMessage(messages.subtitle)}
          </Text>
        </VStack>
      </Flex>

      <AccordionIcon />
    </AccordionButton>
  )
}

export default IndicatorsAccordionButton
