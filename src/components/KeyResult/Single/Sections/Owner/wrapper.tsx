import { Popover, PopoverTrigger, PopoverContent, Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import useGetKeyResultWithId from '../../Drawer/hooks/get-key-result-with-id'
import { KeyResultSectionHeading } from '../Heading/wrapper'

import messages from './messages'
import KeyResultSectionOwner from './owner'
import { SupportTeamField } from './support-team-field'
import { KeyResultAvailableOwners } from './user-list'

interface KeyResultSingleSectionOwnerWrapperProperties {
  keyResultID?: string
}

const policySelector = buildPartialSelector<KeyResult['policy']>('policy')
const timelineSelector = buildPartialSelector<KeyResult['timeline']>('timeline')

export const KeyResultSingleSectionOwnerWrapper = ({
  keyResultID,
}: KeyResultSingleSectionOwnerWrapperProperties): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const intl = useIntl()
  const policy = useRecoilValue(policySelector(keyResultID))
  const [keyResult, setKeyResult] = useRecoilState(keyResultAtomFamily(keyResultID))
  const setTimeline = useSetRecoilState(timelineSelector(keyResultID))
  const { refetch } = useGetKeyResultWithId(keyResultID)

  const canUserUpdate = policy?.update === GraphQLEffect.ALLOW
  const isKeyResultActive = keyResult?.status?.isActive
  const isIndividualKeyResult = !keyResult?.teamId
  const canUpdate = canUserUpdate && isKeyResultActive && !isIndividualKeyResult
  const supportTeamMembers = keyResult?.supportTeamMembers?.edges?.map(({ node }) => node)

  const handleOpen = () => {
    if (canUpdate && !isOpen) setIsOpen(true)
  }

  const handleClose = () => {
    if (isOpen) setIsOpen(false)
  }

  const handleUpdate = async () => {
    setKeyResult({
      ...keyResult,
      owner: undefined,
    })
    const { data } = await refetch()
    setTimeline(data.keyResult.timeline)
    handleClose()
  }

  return keyResult ? (
    <Flex direction="row" justifyContent="space-between">
      <Flex gridGap={2} direction="column" flexGrow={1}>
        <Popover
          isLazy
          placement="bottom-start"
          isOpen={isOpen}
          size="md"
          onOpen={handleOpen}
          onClose={handleClose}
        >
          <KeyResultSectionHeading>{intl.formatMessage(messages.label)} </KeyResultSectionHeading>
          <Flex direction="row">
            <PopoverTrigger>
              <Box>
                <KeyResultSectionOwner
                  keyResultID={keyResultID}
                  isEditing={isOpen}
                  isIndividualKeyResult={isIndividualKeyResult}
                />
              </Box>
            </PopoverTrigger>
            <Box flexGrow={1} />
          </Flex>
          <PopoverContent width="md" h="full" overflow="hidden">
            <KeyResultAvailableOwners keyResultID={keyResultID} onSelect={handleUpdate} />
          </PopoverContent>
        </Popover>
      </Flex>
      {supportTeamMembers?.length || canUpdate ? (
        <Flex gridGap={2} direction="column" flexGrow={1}>
          <SupportTeamField
            supportTeamMembers={supportTeamMembers}
            keyResultId={keyResultID}
            hasPermitionToUpdate={canUpdate}
            ownerName={keyResult?.owner?.firstName}
          />
        </Flex>
      ) : undefined}
    </Flex>
  ) : (
    <div />
  )
}
