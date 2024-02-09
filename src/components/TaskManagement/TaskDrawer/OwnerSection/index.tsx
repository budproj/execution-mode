import { Popover, PopoverTrigger, PopoverContent, Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

import KeyResultSectionOwner from 'src/components/KeyResult/Single/Sections/Owner/owner'
import { SupportTeamField } from 'src/components/KeyResult/Single/Sections/Owner/support-team-field'
import { KeyResultAvailableOwners } from 'src/components/KeyResult/Single/Sections/Owner/user-list'
import { User } from 'src/components/User/types'

interface KeyResultSingleSectionOwnerWrapperProperties {
  readonly users?: User[]
  readonly supportTeam?: User[]
  readonly ownerId?: string
}

export const TaskDrawerSectionOwnerWrapper = ({
  users,
  supportTeam,
  ownerId,
}: KeyResultSingleSectionOwnerWrapperProperties): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  console.log({ users })

  const handleOpen = () => {
    if (!isOpen) setIsOpen(true)
  }

  const handleClose = () => {
    if (isOpen) setIsOpen(false)
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleUpdate = async () => {
    return true
  }

  return (
    <Flex direction="row" justifyContent="space-between" marginY="24px">
      <Flex gridGap={2} direction="column" flexGrow={1}>
        <Popover
          isLazy
          placement="bottom-start"
          isOpen={isOpen}
          size="md"
          onOpen={handleOpen}
          onClose={handleClose}
        >
          <Text color="gray.500" fontWeight={700} marginBottom="8px">
            RESPONSÁVEL
          </Text>
          <Flex direction="row">
            <PopoverTrigger>
              <Box>
                <KeyResultSectionOwner ownerId={ownerId} isEditing={isOpen} />
              </Box>
            </PopoverTrigger>
            <Box flexGrow={1} />
          </Flex>
          <PopoverContent width="md" h="full" overflow="hidden">
            <KeyResultAvailableOwners onSelect={handleUpdate} />
          </PopoverContent>
        </Popover>
      </Flex>
      <Flex gridGap={2} direction="column" flexGrow={1}>
        <SupportTeamField isFromTask hasPermitionToUpdate supportTeamMembers={supportTeam} />
      </Flex>
    </Flex>
  )
}
