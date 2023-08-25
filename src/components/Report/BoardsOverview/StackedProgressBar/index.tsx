import { Flex, StyleProps, Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'

import { getConfidenceQuantities } from '../constants'
import { Confidence, HealthConfidenceQuantites } from '../types'

import { StackedProgressBarSkeleton } from './skeleton'

interface StackedProgressBarProperties extends StyleProps {
  total?: number
  confidences: Confidence[]
  quantities: HealthConfidenceQuantites
  isLoading?: boolean
}

function percentage(partialValue: number, totalValue: number) {
  const percentage = (partialValue * 100) / totalValue
  return `${percentage < 1 ? Math.ceil(percentage) : percentage.toFixed(0)}%`
}

const StyledBarPiece = styled(Box)`
  &::before {
    content: '${({ confidenceNumber }) => confidenceNumber}';
  }
`

const StackedProgressBar = ({
  isLoading,
  confidences,
  total = 0,
  quantities,
  ...rest
}: StackedProgressBarProperties) => {
  const confidencesToRender = useMemo(
    () =>
      confidences
        .map(getConfidenceQuantities(quantities))
        .filter((confidence) => confidence.quantity > 0),
    [confidences, quantities],
  )

  return isLoading ? (
    <StackedProgressBarSkeleton />
  ) : (
    <Flex
      bg="transparent"
      borderRadius="18px"
      mt="14px"
      w="100%"
      color="white"
      overflow="hidden"
      {...rest}
    >
      {confidencesToRender.map((confidence) => {
        const { name, color, quantity } = confidence

        return (
          <StyledBarPiece
            key={name}
            w={`${percentage(quantity, total) ? percentage(quantity, total) : 1}`}
            maxHeight="21px"
            bg={color}
            paddingLeft="10px"
            confidenceNumber={`${percentage(quantity, total)}`}
            fontSize="14px"
          />
        )
      })}
    </Flex>
  )
}

export default StackedProgressBar
