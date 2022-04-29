import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { krHealthStatusAtom } from 'src/state/recoil/key-result'

import { useGetHealthConfidenceQuantities } from '../hooks/getHealthConfidenceQuantities'

import Board from './Board'
import KeyResultConfidence from './KeyResultConfidences'
import { KeyResultListingModal } from './KeyResultListing'
import messages from './messages'

const BoardsOverview = ({ ...rest }) => {
  const { data, loading } = useGetHealthConfidenceQuantities()
  const [krHealthStatus, setKrHealthStatus] = useRecoilState(krHealthStatusAtom)
  const intl = useIntl()

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
          shadow="for-background.light"
        />
        <KeyResultConfidence isLoading={loading} quantities={data} shadow="for-background.light" />
      </Flex>

      {krHealthStatus && (
        <KeyResultListingModal
          isOpen
          krHealthStatus={krHealthStatus}
          // eslint-disable-next-line unicorn/no-useless-undefined
          onClose={() => setKrHealthStatus(undefined)}
        />
      )}
    </>
  )
}

export default BoardsOverview
