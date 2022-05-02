import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Heading,
  Flex,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import KeyResultList from 'src/components/KeyResult/List'
import { KEY_RESULT_LIST_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KEY_RESULT_LIST_TYPE } from 'src/components/KeyResult/List/constants'
import { useGetKeyResults } from 'src/components/KeyResult/hooks'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'

import messages from './messages'

export interface BoardsOverviewProperties {
  isOpen: boolean
  confidence: number
  onClose: () => void
}

const StyledModal = styled(ModalContent)`
  width: 90%;
  max-width: 1200px;
`

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

export const KeyResultListingModal = ({
  isOpen,
  confidence,
  onClose,
}: BoardsOverviewProperties) => {
  const { data, loading } = useGetKeyResults()
  const [currentConfidenceTag] = useConfidenceTag(confidence)
  const intl = useIntl()

  const keyResultIds = useMemo(() => data.map(({ id }) => id), [data])
  const confidenceText = useMemo(
    () => currentConfidenceTag.messages.long.toLowerCase(),
    [currentConfidenceTag],
  )

  return (
    <Modal isOpen={isOpen} size="100%" onClose={onClose}>
      <ModalOverlay />
      <StyledModal>
        <ModalBody>
          <Flex mb={6} justifyContent="space-between" alignItems="center">
            <Heading color="new-gray.900" fontWeight={500} as="h3" size="lg">
              {intl.formatMessage(messages.modalTitle, { confidence: confidenceText })}
            </Heading>
            <ModalCloseButton
              bg="black.100"
              color="new-gray.600"
              borderRadius="50%"
              position="relative"
            />
          </Flex>

          <StyledTableWrapper>
            <KeyResultList
              type={KEY_RESULT_LIST_TYPE.STATIC}
              keyResultIDs={keyResultIds}
              isLoading={loading}
              templateColumns="1.5fr 1fr 100px 80px 1fr"
              borderColor="new-gray.400"
              flex="1"
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
          </StyledTableWrapper>
        </ModalBody>
      </StyledModal>
    </Modal>
  )
}
