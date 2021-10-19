import { useMutation } from '@apollo/client'
import { Text, Flex, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { DynamicAvatarGroup } from 'src/components/Base'
import PlusIcon from 'src/components/Icon/Plus'
import { User } from 'src/components/User/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import messages from './messages'
import queries from './queries.gql'
import { SupportTeamPopover } from './support-team-popover'

type SupportTeamFieldProperties = {
  supportTeamMembers?: User[]
  hasPermitionToUpdate?: boolean
  keyResultId?: string
  ownerName?: string
}

export const SupportTeamField = ({
  supportTeamMembers,
  hasPermitionToUpdate,
  keyResultId,
  ownerName,
}: SupportTeamFieldProperties) => {
  const intl = useIntl()

  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => hasPermitionToUpdate && setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const [keyResult, setKeyResult] = useRecoilState(keyResultAtomFamily(keyResultId))
  const [addUserToSupportTeam] = useMutation(queries.ADD_USER, {
    onCompleted: (data) =>
      setKeyResult({
        ...keyResult,
        ...data.addUserAsSupportTeamToKeyResult,
      }),
  })

  const addUser = (userId: string) => {
    void addUserToSupportTeam({ variables: { keyResultId, userId } })
    handleClose()
  }

  const [removeUserToSupportTeam] = useMutation(queries.REMOVE_USER, {
    onCompleted: (data) =>
      setKeyResult({
        ...keyResult,
        ...data.removeUserAsSupportTeamToKeyResult,
      }),
  })

  const removeUser = (userId: string) => {
    void removeUserToSupportTeam({ variables: { keyResultId, userId } })
    handleClose()
  }

  const [isHovering, setIsHovering] = useState(false)
  const handleMouseEnter = () => hasPermitionToUpdate && setIsHovering(true)
  const handleMouseLeave = () => hasPermitionToUpdate && setIsHovering(false)

  const isLoaded = Boolean(supportTeamMembers)

  return (
    <Popover
      isLazy
      enabled={hasPermitionToUpdate}
      placement="bottom-start"
      isOpen={isOpen}
      size="md"
      onOpen={handleOpen}
      onClose={handleClose}
    >
      <KeyResultSectionHeading>{intl.formatMessage(messages.supportTeam)}</KeyResultSectionHeading>
      <PopoverTrigger>
        <Flex
          direction="row"
          flexWrap="nowrap"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <DynamicAvatarGroup users={supportTeamMembers ?? []} isLoaded={isLoaded} />
          {isLoaded && hasPermitionToUpdate && (
            <Flex alignItems="center">
              <Flex
                w={12}
                h={12}
                marginRight="0.5em"
                justifyContent="center"
                alignItems="center"
                background="new-gray.200"
                borderColor={isHovering ? 'brand.500' : 'new-gray.500'}
                borderRadius="full"
                borderWidth={2}
                borderStyle="dashed"
              >
                <PlusIcon
                  w="0.6em"
                  h="0.6em"
                  fill={isHovering ? 'brand.500' : 'new-gray.500'}
                  desc={intl.formatMessage(messages.addSupportTeam)}
                />
              </Flex>
              <Text color={isHovering ? 'brand.500' : 'new-gray.700'}>
                {supportTeamMembers?.length ? '' : intl.formatMessage(messages.add)}
              </Text>
            </Flex>
          )}
        </Flex>
      </PopoverTrigger>
      <PopoverContent width="md" h="full">
        <SupportTeamPopover
          supportTeamMembers={supportTeamMembers}
          addUser={addUser}
          removeUser={removeUser}
          ownerName={ownerName}
        />
      </PopoverContent>
    </Popover>
  )
}
