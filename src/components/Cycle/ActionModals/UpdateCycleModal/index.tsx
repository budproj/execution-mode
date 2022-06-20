import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

import { Team } from 'src/components/Team/types'

import { Cycle } from '../../types'
import { CycleSelectOption } from '../FormCycle'

import { UpdateCycle } from './update-cycle'

const StyledModal = styled(ModalContent)`
  width: 90%;
  max-width: 470px;
  border-radius: 10px;
`
interface CycleActionModalProperties {
  isOpen: boolean
  teamId?: Team['id']
  parents: CycleSelectOption[]
  cycleId?: Cycle['id']
  onCancel: () => void
}

export const UpdateCycleModal = ({
  isOpen,
  parents,
  cycleId,
  teamId,
  onCancel,
}: CycleActionModalProperties) => {
  return (
    <Modal autoFocus isOpen={isOpen} size="100%" onClose={onCancel}>
      <ModalOverlay />
      <StyledModal>
        <ModalBody p="40px">
          <UpdateCycle parents={parents} cycleId={cycleId} teamId={teamId} onCancel={onCancel} />
        </ModalBody>
      </StyledModal>
    </Modal>
  )
}
