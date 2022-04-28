import { Box, Flex } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import Board from '../Board'
import StackedProgressBar from '../StackedProgressBar'
import { confidenceTexts, getConfidenceQuantities } from '../constants'
import messages from '../messages'
import { HealthConfidenceQuantites } from '../types'

export interface BoardsOverviewProperties {
  quantities: HealthConfidenceQuantites
  isLoading?: boolean
}

const BoardsOverview = ({ quantities, isLoading, ...rest }: BoardsOverviewProperties) => {
  console.log(quantities)
  const intl = useIntl()

  const confidencesToRender = useMemo(
    () => confidenceTexts.map(getConfidenceQuantities(quantities)),
    [quantities],
  )

  return (
    <Flex borderRadius="9px" bg="white" width="100%" paddingY={15} paddingX={18} {...rest}>
      <Board
        isLoading={isLoading}
        title={intl.formatMessage(messages.keyResultsTitle)}
        number={quantities?.keyResultsQuantity}
        bg="new-gray.300"
        minWidth="175px"
        size="lg"
      />
      <Box w="100%" marginLeft="24px">
        <Flex justifyContent="space-between" gridGap="24px">
          {confidencesToRender.map((confidence) => {
            return (
              <Board
                key={confidence.name}
                uppercase
                isLoading={isLoading}
                flex="1"
                title={intl.formatMessage(messages[`${confidence.name}`])}
                color={confidence.color}
                number={confidence.quantity}
                bg={confidence.bg}
                paddingX={30}
              />
            )
          })}
        </Flex>
        <StackedProgressBar
          isLoading={isLoading}
          total={quantities?.keyResultsQuantity}
          confidences={confidenceTexts}
          quantities={quantities}
        />
      </Box>
    </Flex>
  )
}

export default BoardsOverview
