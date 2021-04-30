import { Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/popover'
import { Box, Flex, useTheme } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import { KeyResultSingleSectionOwnerUpdateWrapper } from './Update/wrapper'
import messages from './messages'
import KeyResultSectionOwner from './owner'

interface KeyResultSingleSectionOwnerWrapperProperties {
  keyResultID?: string
}

const policySelector = buildPartialSelector<KeyResult['policy']>('policy')

export const KeyResultSingleSectionOwnerWrapper = ({
  keyResultID,
}: KeyResultSingleSectionOwnerWrapperProperties) => {
  const [isOpen, setIsOpen] = useState(false)
  const intl = useIntl()
  const policy = useRecoilValue(policySelector(keyResultID))
  const theme = useTheme()

  const canUpdate = policy?.update === GraphQLEffect.ALLOW

  const handleOpen = () => {
    if (canUpdate && !isOpen) setIsOpen(true)
  }

  const handleClose = () => {
    if (isOpen) setIsOpen(false)
  }

  return (
    <Box zIndex={theme.zIndices.popover}>
      <Popover placement="bottom-start" isOpen={isOpen} onOpen={handleOpen} onClose={handleClose}>
        <Flex gridGap={2} direction="column">
          <KeyResultSectionHeading>{intl.formatMessage(messages.label)} </KeyResultSectionHeading>
          <Flex direction="row">
            <PopoverTrigger>
              <Box>
                <KeyResultSectionOwner keyResultID={keyResultID} />
              </Box>
            </PopoverTrigger>
            <Box flexGrow={1} />
          </Flex>
        </Flex>
        <PopoverContent width="md">
          <KeyResultSingleSectionOwnerUpdateWrapper keyResultID={keyResultID} isOpen={isOpen} />
        </PopoverContent>
      </Popover>
    </Box>
  )
}
