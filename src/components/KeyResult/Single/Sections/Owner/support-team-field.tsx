import { useMutation } from '@apollo/client'
import { Text, Flex, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import { DynamicAvatarGroup } from 'src/components/Base'
import PlusIcon from 'src/components/Icon/Plus'
import GET_KEY_RESULTS_HIGHLIGHTS from 'src/components/Page/Team/Highlights/get-key-results-highlights.gql'
import GET_NO_RELATED_MEMBERS from 'src/components/Page/Team/Highlights/hooks/getNoRelatedMembers/get-no-related-members.gql'
import { User } from 'src/components/User/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { selectedTeamIdHighlight } from 'src/state/recoil/team/highlight/selected-team-id-highlight'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import messages from './messages'
import queries from './queries.gql'
import { SupportTeamPopover } from './support-team-popover'

type SupportTeamFieldProperties = {
  readonly supportTeamMembers?: User[]
  readonly hasPermitionToUpdate?: boolean
  readonly keyResultId?: string
  readonly ownerName?: string
  readonly isFromTask?: boolean
}

export const SupportTeamField = ({
  supportTeamMembers,
  hasPermitionToUpdate,
  keyResultId,
  ownerName,
  isFromTask,
}: SupportTeamFieldProperties) => {
  const intl = useIntl()
  const teamId = useRecoilValue(selectedTeamIdHighlight)

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
    refetchQueries: [
      {
        query: GET_NO_RELATED_MEMBERS,
        variables: { teamId },
      },
      {
        query: GET_KEY_RESULTS_HIGHLIGHTS,
        variables: { teamId },
      },
    ],
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

    refetchQueries: [
      {
        query: GET_NO_RELATED_MEMBERS,
        variables: { teamId },
      },
      {
        query: GET_KEY_RESULTS_HIGHLIGHTS,
        variables: { teamId },
      },
    ],
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
      placement="bottom-start"
      isOpen={isOpen}
      size="md"
      onOpen={handleOpen}
      onClose={handleClose}
    >
      {isFromTask ? (
        <Text color="gray.500" fontWeight={700} marginBottom="8px">
          TIME DE APOIO
        </Text>
      ) : (
        <KeyResultSectionHeading>
          {intl.formatMessage(messages.supportTeam)}
        </KeyResultSectionHeading>
      )}
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
