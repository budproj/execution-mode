import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'

import KeyResultList from 'src/components/KeyResult/List'
import { KEY_RESULT_LIST_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KEY_RESULT_LIST_TYPE } from 'src/components/KeyResult/List/constants'
import { useGetKeyResults } from 'src/components/KeyResult/hooks'

export interface BoardsOverviewProperties {
  isOpen: boolean
  onClose: () => void
}

const StyledModal = styled(ModalContent)`
  width: 90%;
  max-width: 1200px;
`

export const KeyResultListingModal = ({ isOpen, onClose }: BoardsOverviewProperties) => {
  const { data, loading } = useGetKeyResults()

  const keyResultIds = useMemo(() => data.map(({ id }) => id), [data])

  return (
    <Modal isOpen={isOpen} size="100%" onClose={onClose}>
      <ModalOverlay />
      <StyledModal>
        <ModalHeader>Todos os resultados-chave de média confiança</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <KeyResultList
            type={KEY_RESULT_LIST_TYPE.STATIC}
            keyResultIDs={keyResultIds}
            isLoading={loading}
            templateColumns="1.5fr 1fr 100px 80px 1fr"
            borderColor="new-gray.400"
            headProperties={{
              [KEY_RESULT_LIST_COLUMN.KEY_RESULT]: {
                hidden: false,
              },
              [KEY_RESULT_LIST_COLUMN.PROGRESS]: {
                hidden: false,
              },
              [KEY_RESULT_LIST_COLUMN.TEAM]: {
                hidden: false,
              },
              [KEY_RESULT_LIST_COLUMN.OWNER]: {
                hidden: false,
              },
              [KEY_RESULT_LIST_COLUMN.OBJECTIVE]: {
                hidden: false,
              },
            }}
            columns={[
              KEY_RESULT_LIST_COLUMN.KEY_RESULT,
              KEY_RESULT_LIST_COLUMN.PROGRESS,
              KEY_RESULT_LIST_COLUMN.TEAM,
              KEY_RESULT_LIST_COLUMN.OWNER,
              KEY_RESULT_LIST_COLUMN.OBJECTIVE,
            ]}
            bodyProperties={{
              [KEY_RESULT_LIST_COLUMN.KEY_RESULT]: {
                withDynamicIcon: true,
                withLastUpdateInfo: true,
              },
              [KEY_RESULT_LIST_COLUMN.PROGRESS]: {
                withConfidenceTag: true,
              },
              [KEY_RESULT_LIST_COLUMN.OWNER]: {
                justifyContent: 'flex-end',
              },
            }}
          />
        </ModalBody>
      </StyledModal>
    </Modal>
  )
}
