import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Heading,
  Flex,
  Button,
  HStack,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { memo, useCallback, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import KeyResultList from 'src/components/KeyResult/List'
import { KEY_RESULT_LIST_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KEY_RESULT_LIST_TYPE } from 'src/components/KeyResult/List/constants'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

export interface KeyResultModalListingProperties {
  isOpen: boolean
  onClose: () => void
  loadNextKrsPage?: () => Promise<void>
  loadPreviousKrsPage?: () => void
  showPreviousPageButton?: boolean
  showNextPageButton?: boolean
  keyResultIds: string[]
  dispatchEvent?: () => void
  isLoading: boolean
  modalHeadingTitle: string
}

const StyledModal = styled(ModalContent)`
  width: 90%;
  max-width: 1200px;
  border-radius: 15px;
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

export const KeyResultListingModal = memo(
  ({
    isOpen,
    loadNextKrsPage,
    loadPreviousKrsPage,
    showPreviousPageButton = false,
    showNextPageButton = false,
    keyResultIds,
    dispatchEvent,
    modalHeadingTitle,
    isLoading,
    onClose,
  }: KeyResultModalListingProperties) => {
    const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)

    useEffect(() => {
      if (dispatchEvent) dispatchEvent()
    }, [dispatchEvent])

    const onLineClick = useCallback((id: KeyResult['id']) => setOpenDrawer(id), [setOpenDrawer])

    return (
      <Modal
        isOpen={isOpen}
        returnFocusOnClose={false}
        size="100%"
        autoFocus={false}
        onClose={onClose}
      >
        <ModalOverlay />
        <StyledModal>
          <ModalBody p="40px">
            <Flex mb={12} justifyContent="space-between" alignItems="center">
              <Heading color="new-gray.900" fontWeight={500} as="h3" size="lg">
                {modalHeadingTitle}
              </Heading>
              <ModalCloseButton
                bg="black.100"
                color="new-gray.600"
                borderRadius="50%"
                position="relative"
                top="0"
              />
            </Flex>

            <StyledTableWrapper>
              <KeyResultList
                type={KEY_RESULT_LIST_TYPE.STATIC}
                keyResultIDs={keyResultIds}
                isLoading={isLoading}
                hasMoreKeyResults={showNextPageButton}
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
                }}
                onLineClick={onLineClick}
              />
            </StyledTableWrapper>
            <HStack width="100%" mt={10} gap={2} alignItems="center" justifyContent="flex-end">
              {!isLoading && showPreviousPageButton && (
                <Button
                  bg="brand.500"
                  color="white"
                  _hover={{ backgroundColor: 'brand.300' }}
                  onClick={loadPreviousKrsPage}
                >
                  Prev
                </Button>
              )}
              {!isLoading && showNextPageButton && (
                <Button
                  bg="brand.500"
                  color="white"
                  _hover={{ backgroundColor: 'brand.300' }}
                  onClick={loadNextKrsPage}
                >
                  Next
                </Button>
              )}
            </HStack>
          </ModalBody>
        </StyledModal>
      </Modal>
    )
  },
)
