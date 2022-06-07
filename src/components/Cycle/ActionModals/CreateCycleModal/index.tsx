import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

import { Team } from 'src/components/Team/types'

import { ParentsSelectProperties } from '../UpdateCycleModal/Form'

import { CreateCycle } from './create-cycle'

const StyledModal = styled(ModalContent)`
  width: 90%;
  max-width: 470px;
  border-radius: 10px;
`
interface CycleActionModalProperties {
  isOpen: boolean
  teamId?: Team['id']
  parents: ParentsSelectProperties[]
  onCancel: () => void
}

export const CreateCycleModal = ({
  isOpen,
  teamId,
  parents,
  onCancel,
}: CycleActionModalProperties) => {
  return (
    <Modal autoFocus isOpen={isOpen} size="100%" onClose={() => onCancel()}>
      <ModalOverlay />
      <StyledModal>
        <ModalBody p="40px">
          <CreateCycle cycleParents={parents} teamId={teamId} onCancel={onCancel} />
        </ModalBody>
      </StyledModal>
    </Modal>
  )
}
