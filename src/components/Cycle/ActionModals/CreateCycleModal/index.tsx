import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'

import { useGetCycle } from '../../hooks'

import { CreateCycle } from './create-cycle'

const StyledModal = styled(ModalContent)`
  width: 90%;
  max-width: 470px;
  border-radius: 10px;
`
interface CycleActionModalProperties {
  isOpen: boolean
  onCancel: () => void
}

export const CreateCycleModal = ({ isOpen, onCancel }: CycleActionModalProperties) => {
  const { data: cycles } = useGetCycle()

  const parents = useMemo(
    () =>
      cycles.map(({ id, period }) => ({
        id,
        label: period,
      })),
    [cycles],
  )
  // TODO: remover TeamID
  return (
    <Modal autoFocus isOpen={isOpen} size="100%" onClose={() => onCancel()}>
      <ModalOverlay />
      <StyledModal>
        <ModalBody p="40px">
          <CreateCycle
            cycleParents={parents}
            teamId="0788abd6-4996-4224-8f24-094b2d3c0d3a"
            onCancel={onCancel}
          />
        </ModalBody>
      </StyledModal>
    </Modal>
  )
}
