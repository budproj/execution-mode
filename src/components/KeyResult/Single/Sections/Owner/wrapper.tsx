import { Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/popover'
import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import { KeyResultSingleSectionOwnerUpdateWrapper } from './Update/wrapper'
import messages from './messages'
import KeyResultSectionOwner from './owner'

interface KeyResultSingleSectionOwnerWrapperProperties {
  keyResultID?: string
}

export const KeyResultSingleSectionOwnerWrapper = ({
  keyResultID,
}: KeyResultSingleSectionOwnerWrapperProperties) => {
  const intl = useIntl()

  return (
    <Popover placement="bottom-start">
      <Flex gridGap={2} direction="column">
        <KeyResultSectionHeading>{intl.formatMessage(messages.label)} </KeyResultSectionHeading>
        <PopoverTrigger>
          <Box>
            <KeyResultSectionOwner keyResultID={keyResultID} />
          </Box>
        </PopoverTrigger>
      </Flex>
      <PopoverContent>
        <KeyResultSingleSectionOwnerUpdateWrapper keyResultID={keyResultID} />
      </PopoverContent>
    </Popover>
  )
}
