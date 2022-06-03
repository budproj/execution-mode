import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

import { Cycle } from '../../types'

import { ParentsSelectProperties } from './Form'
import { UpdateCycle } from './update-cycle'

const StyledModal = styled(ModalContent)`
  width: 90%;
  max-width: 470px;
  border-radius: 10px;
`
interface CycleActionModalProperties {
  isOpen: boolean
  parents: ParentsSelectProperties[]
  cycleId?: Cycle['id']
  onCancel: () => void
}

export const UpdateCycleModal = ({
  isOpen,
  parents,
  cycleId,
  onCancel,
}: CycleActionModalProperties) => {
  // TODO: remover TeamID
  return (
    <Modal autoFocus isOpen={isOpen} size="100%" onClose={onCancel}>
      <ModalOverlay />
      <StyledModal>
        <ModalBody p="40px">
          <UpdateCycle
            parents={parents}
            cycleId={cycleId}
            teamId="0788abd6-4996-4224-8f24-094b2d3c0d3a"
            onCancel={onCancel}
          />
        </ModalBody>
      </StyledModal>
    </Modal>
  )
}
