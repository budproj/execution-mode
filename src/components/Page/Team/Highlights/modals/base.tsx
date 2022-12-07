import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useCallback } from 'react'
import { useRecoilState } from 'recoil'

import { configHighlightModal } from 'src/state/recoil/team/highlight/is-open-highlight-modal'

import { UsersTeamList } from './UsersTeamList'
import { HeadUsersTeamList } from './UsersTeamList/head'

const StyledTableWrapper = styled(Flex)`
  max-height: calc(100vh - 200px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cecece;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
`

const StyledModal = styled(ModalContent)`
  max-width: 80%;
  border-radius: 10px;
`

const titleName = (type?: string) => {
  if (type === 'feeling') {
    return 'desanimados'
  }

  if (type === 'productivity') {
    return 'com baixa produtividade'
  }

  if ((type = 'roadblock')) {
    return 'com bloqueio'
  }
}

const TeamHightlightModal = () => {
  const [{ isOpen, type, usersIds }, setModalConfig] = useRecoilState(configHighlightModal)

  const handleModalClose = useCallback(() => {
    setModalConfig({ isOpen: false, type: undefined, usersIds: [] })
  }, [setModalConfig])

  return (
    <Modal
      autoFocus
      returnFocusOnClose={false}
      isOpen={isOpen}
      size="100%"
      onClose={handleModalClose}
    >
      <ModalOverlay />
      <StyledModal>
        <ModalBody p="40px">
          <Flex mb={12} justifyContent="space-between" alignItems="center">
            <Heading color="new-gray.900" fontWeight={500} fontSize="24px">
              Membros desse time {titleName(type)} na semana
            </Heading>
            <ModalCloseButton
              bg="#F1F3F6"
              borderRadius="50%"
              stroke="new-gray.600"
              color="new-gray.600"
              outline={0}
              _focus={{
                outline: 0,
              }}
              position="relative"
              top="0"
            />
          </Flex>
          <StyledTableWrapper>
            <Flex flexDir="column" flex="1">
              <HeadUsersTeamList type={type} />

              {usersIds.map((userId) => (
                <UsersTeamList key={userId} userId={userId} type={type} />
              ))}
            </Flex>
          </StyledTableWrapper>
        </ModalBody>
      </StyledModal>
    </Modal>
  )
}

export default TeamHightlightModal
