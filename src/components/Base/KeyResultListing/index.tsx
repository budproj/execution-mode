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
import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import KeyResultList from 'src/components/KeyResult/List'
import { KEY_RESULT_LIST_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KEY_RESULT_LIST_TYPE } from 'src/components/KeyResult/List/constants'
import {
  FetchMoreVariables,
  KRS_PER_PAGE,
} from 'src/components/KeyResult/hooks/getKeyResults/get-key-results'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'
import { krTableLengthAtom } from 'src/state/recoil/key-result/kr-table-lenght.atom'

export interface KeyResultModalListingProperties {
  isOpen: boolean
  onClose: () => void
  loadingData: boolean
  data: KeyResult[]
  dispatchEvent?: () => void
  modalHeadingTitle: string
  fetchMore?: ({ limit, offset }: FetchMoreVariables) => Promise<void>
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

export const KeyResultListingModal = ({
  isOpen,
  data,
  dispatchEvent,
  modalHeadingTitle,
  loadingData,
  onClose,
  fetchMore,
}: KeyResultModalListingProperties) => {
  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)
  const krTableLength = useRecoilValue(krTableLengthAtom)

  const [lastKrListed, setLastKrListed] = useState({
    firstListElement: 0,
    lastListElement: KRS_PER_PAGE,
  })
  const dataToRender = useMemo(() => {
    return data.slice(lastKrListed.firstListElement, lastKrListed.lastListElement)
  }, [data, lastKrListed])

  const keyResultIds = useMemo(() => dataToRender.map(({ id }) => id), [dataToRender])

  const firstListKeyResultIndex = data.findIndex((kr) => kr.id === keyResultIds[0])

  const showPreviousPageButton =
    !loadingData && firstListKeyResultIndex > 0 && keyResultIds.length < data.length

  const showNextPageButton =
    !loadingData &&
    krTableLength > 0 &&
    (krTableLength > data.length ||
      (data.length === krTableLength && krTableLength > lastKrListed.lastListElement))

  const loadNextKrsPage = async () => {
    if (fetchMore) {
      const lastRenderedIndex = data.findIndex(
        (kr) => kr.id === keyResultIds[keyResultIds.length - 1],
      )

      const lastDataIndex = data.indexOf(data[data.length - 1])
      const mustFetchMore = lastRenderedIndex === lastDataIndex

      if (mustFetchMore) {
        await fetchMore({
          limit: KRS_PER_PAGE,
          offset: data.length,
        })
      }

      setLastKrListed({
        firstListElement: lastRenderedIndex + 1,
        lastListElement: lastRenderedIndex + KRS_PER_PAGE + 1,
      })
    }
  }

  const loadPreviousKrsPage = () => {
    const firstRenderedIndex = data.findIndex((kr) => kr.id === keyResultIds[0])

    setLastKrListed({
      firstListElement: firstRenderedIndex - KRS_PER_PAGE,
      lastListElement: firstRenderedIndex,
    })
  }

  useEffect(() => {
    if (dispatchEvent) dispatchEvent()
  }, [dispatchEvent])

  const onLineClick = (id: KeyResult['id']) => setOpenDrawer(id)

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
              isLoading={loadingData}
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
          <HStack width="100%" mt={10} alignItems="center" justifyContent="flex-end">
            {showPreviousPageButton && (
              <Button
                bg="brand.500"
                color="white"
                _hover={{ backgroundColor: 'brand.300' }}
                onClick={loadPreviousKrsPage}
              >
                Prev
              </Button>
            )}
            {showNextPageButton && (
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
}
