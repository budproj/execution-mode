import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import React from 'react'
import { useIntl } from 'react-intl'

import { CARD_TYPES } from '../utils/card-types'

import messages from './messages'

const DynamicTeamRoutineHighlightsTable = dynamic(
  async () => import('src/components/Team/RoutineHighlightsTable/wrapper'),
)

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

interface RoutineHighlightModalProperties {
  isOpen: boolean
  handleModalClose: () => void
  type: CARD_TYPES
  usersIds?: string[]
}

export const RoutineHighlightModal = ({
  isOpen,
  handleModalClose,
  type,
  usersIds,
}: RoutineHighlightModalProperties) => {
  const intl = useIntl()
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
              {intl.formatMessage(messages.routineModalTitle, { type })}
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
            {isOpen && usersIds && (
              <DynamicTeamRoutineHighlightsTable cardType={type} usersIds={usersIds} />
            )}
          </StyledTableWrapper>
        </ModalBody>
      </StyledModal>
    </Modal>
  )
}
