import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useCallback } from 'react'
import { useRecoilState } from 'recoil'

import { Team } from 'src/components/Team/types'
import { configHighlightModal } from 'src/state/recoil/team/highlight/is-open-highlight-modal'

const StyledModal = styled(ModalContent)`
  width: 90%;
  max-width: 470px;
  border-radius: 10px;
`

interface TeamHighlightModal {
  teamId: Team['id']
}

const TeamHightlightModal = ({ teamId }: TeamHighlightModal) => {
  const [{ isOpen, type }, setModalConfig] = useRecoilState(configHighlightModal)

  const handleModalClose = useCallback(() => {
    setModalConfig({ isOpen: false, type: undefined })
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
          <Text>
            <h3 style={{ fontSize: 22 }}>Infos to build body of modal:</h3> <br />{' '}
            <b>* TeamId: {teamId}</b>
            <br />
            <b>* CardType: {type}</b>
          </Text>
        </ModalBody>
        <ModalCloseButton
          bg="#F1F3F6"
          borderRadius="50%"
          fill="new-gray.600"
          stroke="new-gray.600"
          fontWeight="black"
          outline={0}
          _focus={{
            outline: 0,
          }}
        />
      </StyledModal>
    </Modal>
  )
}

export default TeamHightlightModal
