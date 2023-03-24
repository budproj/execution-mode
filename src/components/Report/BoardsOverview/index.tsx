import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { krHealthStatusAtom } from 'src/state/recoil/key-result'
import { krTableLengthAtom } from 'src/state/recoil/key-result/kr-table-lenght.atom'

import { useGetHealthConfidenceQuantities } from '../hooks/getHealthConfidenceQuantities'

import Board from './Board'
import KeyResultConfidence from './KeyResultConfidences'
import { ConfidenceMapper } from './KeyResultListing/types'
import { KeyResultsListingTable } from './KeyResultsListingTable'
import messages from './messages'

const BoardsOverview = ({ ...rest }) => {
  const { data, loading } = useGetHealthConfidenceQuantities()
  const [krHealthStatus, setKrHealthStatus] = useRecoilState(krHealthStatusAtom)
  const setKrTableLength = useSetRecoilState(krTableLengthAtom)
  const confidence = krHealthStatus ? ConfidenceMapper[krHealthStatus] : 0

  const intl = useIntl()

  const handleCloseTable = () => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    setKrHealthStatus(undefined)
    setKrTableLength(0)
  }

  return (
    <>
      <Flex minHeight={155} mt="36px" gridGap="24px" {...rest}>
        <Board
          isLoading={loading}
          title={intl.formatMessage(messages.objectivesTitle)}
          number={data.objectivesQuantity}
          paddingX={55}
          size="lg"
          color="new-gray.800"
          bgColor="white"
          bgHover="white"
          shadow="for-background.light"
        />
        <KeyResultConfidence isLoading={loading} quantities={data} shadow="for-background.light" />
      </Flex>

      {krHealthStatus && (
        <KeyResultsListingTable
          isOpen
          confidence={confidence}
          // eslint-disable-next-line unicorn/no-useless-undefined
          onClose={handleCloseTable}
        />
      )}
    </>
  )
}

export default BoardsOverview
