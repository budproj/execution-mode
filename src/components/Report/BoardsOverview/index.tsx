import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { useGetHealthConfidenceQuantities } from '../hooks/getHealthConfidenceQuantities'

import Board from './Board'
import KeyResultConfidence from './KeyResultConfidences'
import messages from './messages'

const BoardsOverview = ({ ...rest }) => {
  const { data, loading } = useGetHealthConfidenceQuantities()
  const intl = useIntl()

  return (
    <Flex minHeight={155} mt="36px" gridGap="24px" {...rest}>
      <Board
        isLoading={loading}
        title={intl.formatMessage(messages.objectivesTitle)}
        number={data.objectivesQuantity}
        paddingX={55}
        size="lg"
        color="new-gray.800"
      />
      <KeyResultConfidence isLoading={loading} quantities={data} />
    </Flex>
  )
}

export default BoardsOverview
