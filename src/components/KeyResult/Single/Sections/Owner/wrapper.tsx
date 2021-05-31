import { Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/popover'
import { Box, Flex, useTheme } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import messages from './messages'
import KeyResultSectionOwner from './owner'
import { KeyResultAvailableOwners } from './user-list'

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
  const [keyResult, setKeyResult] = useRecoilState(keyResultAtomFamily(keyResultID))
  const theme = useTheme()

  const canUpdate = policy?.update === GraphQLEffect.ALLOW

  const handleOpen = () => {
    if (canUpdate && !isOpen) setIsOpen(true)
  }

  const handleClose = () => {
    if (isOpen) setIsOpen(false)
  }

  const handleUpdate = () => {
    setKeyResult({
      ...keyResult,
      owner: undefined,
    })
    handleClose()
  }

  return (
    <Box zIndex={theme.zIndices.popover}>
      <Popover placement="bottom-start" isOpen={isOpen} onOpen={handleOpen} onClose={handleClose}>
        <Flex gridGap={2} direction="column">
          <KeyResultSectionHeading>{intl.formatMessage(messages.label)} </KeyResultSectionHeading>
          <Flex direction="row">
            <PopoverTrigger>
              <Box>
                <KeyResultSectionOwner keyResultID={keyResultID} isEditting={isOpen} />
              </Box>
            </PopoverTrigger>
            <Box flexGrow={1} />
          </Flex>
        </Flex>
        <PopoverContent width="md">
          <KeyResultAvailableOwners
            keyResultID={keyResultID}
            isOpen={isOpen}
            onSelect={handleUpdate}
          />
        </PopoverContent>
      </Popover>
    </Box>
  )
}
