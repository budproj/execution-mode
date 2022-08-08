import { useMutation } from '@apollo/client'
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { SelectMenu } from 'src/components/Base'
import ThreeUsersIcon from 'src/components/Icon/Users'
import GET_TEAM_MEMBERS from 'src/components/Page/Team/Members/queries.gql'
import GET_USERS_LIST from 'src/components/User/AllReachableUsers/queries.gql'
import { AllReachableUsers } from 'src/components/User/AllReachableUsers/wrapper'
import { AddUserToTeamMutationResult } from 'src/components/User/Teams/add-team'
import { User } from 'src/components/User/types'
import { selectedUsersCheckbox } from 'src/state/recoil/user/selected-users-checkbox'

import messages from './messages'
import PlaceholderInput from './placeholderInput'
import queries from './queries.gql'

interface AddMemberToTeamModalProperties {
  isOpen: boolean
  teamID?: string
  onClose: () => void
}

export const AddMemberToTeamModal = ({
  isOpen,
  teamID,
  onClose,
}: AddMemberToTeamModalProperties) => {
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false)
  const toast = useToast()
  const intl = useIntl()

  const [selectedUsers, setSelectedUsers] = useRecoilState(selectedUsersCheckbox)

  const handleChange = (userId: User['id'] | string[]) => {
    if (Array.isArray(userId)) throw new Error('Cannot parse string array')
    if (selectedUsers.includes(userId)) {
      setSelectedUsers((selectedUsers) => [...selectedUsers.filter((id) => id !== userId)])
    } else {
      setSelectedUsers((selectedUsers) => [...selectedUsers, userId])
    }
  }

  const onCloseModal = () => {
    if (selectedUsers.length > 0) setSelectedUsers([])
    void onClose()
  }

  const [addTeamToUsers] = useMutation<AddUserToTeamMutationResult>(queries.ADD_TEAM_TO_USERS, {
    refetchQueries: [
      {
        query: GET_TEAM_MEMBERS,
        variables: { teamID },
      },
      {
        query: GET_USERS_LIST,
      },
    ],
  })

  const handleSelect = () => {
    if (selectedUsers.length > 0) {
      void addTeamToUsers({
        variables: {
          usersIDs: selectedUsers,
          teamID,
        },
        onCompleted: () => {
          setSelectedUsers([])
          onClose()
          toast({
            status: 'success',
            title:
              selectedUsers.length === 1
                ? intl.formatMessage(messages.addOneMemberSuccessToast)
                : intl.formatMessage(messages.addMultipleMembersSuccessToast, {
                    quantityofmembers: selectedUsers.length,
                  }),
          })
        },
      })
    } else {
      toast({
        status: 'error',
        title: intl.formatMessage(messages.addMembersErrorToast),
      })
    }
  }

  const handleOpen = () => {
    if (!isSelectMenuOpen) setIsSelectMenuOpen(true)
  }

  const handleClose = () => {
    if (isSelectMenuOpen) setIsSelectMenuOpen(false)
  }

  return (
    <Modal isOpen={isOpen} size="100%" onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent width="90%" maxWidth="470px">
        <ModalBody>
          <Flex flexDir="column" gap={12}>
            <Heading display="flex" flexDir="column" justifyContent="center" alignItems="center">
              <ThreeUsersIcon desc="sda" fill="brand.500" fontSize={60} mt={4} />
              <Text mt={7} color="gray.500" fontWeight={500} as="h3" fontSize={24}>
                {intl.formatMessage(messages.modalTitle)}
              </Text>
              <Text
                mt={5}
                textAlign="center"
                color="gray.400"
                fontWeight={400}
                fontSize={16}
                maxW={340}
              >
                {intl.formatMessage(messages.modalDescription)}
              </Text>
            </Heading>
            <SelectMenu
              matchWidth
              isLazy
              closeOnSelect
              scroolable={false}
              isOpen={isSelectMenuOpen}
              placement="bottom"
              placeholder={
                <PlaceholderInput
                  qtdUsers={selectedUsers.length}
                  selectedUserId={selectedUsers[0]}
                />
              }
              onOpen={handleOpen}
              onClose={handleClose}
              onChange={handleChange}
            >
              <Box p={4} maxH="full" h="full">
                <AllReachableUsers
                  isSelectingMultiples
                  listUsersExceptByTeam={teamID}
                  avatarSubtitleType="role"
                  onSelect={handleChange}
                />
              </Box>
            </SelectMenu>

            <Box display="flex" flexDir="column" alignItems="center" width="100%" gap={2}>
              <Button
                bg="brand.500"
                color="black.50"
                fontSize={16}
                fontWeight={700}
                _hover={{ background: 'brand.400', color: 'black.50' }}
                paddingY={7}
                width="100%"
                onClick={handleSelect}
              >
                {intl.formatMessage(messages.confirmModalButton)}
              </Button>
              <Button
                fontSize={16}
                fontWeight={700}
                color="brand.500"
                _hover={{ color: 'brand.400' }}
                pt={7}
                width="100%"
                onClick={onCloseModal}
              >
                {intl.formatMessage(messages.closeModalButton)}
              </Button>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
