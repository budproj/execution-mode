import { Flex, StyleProps, Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'

import { HealthConfidenceQuantites } from '../KeyResultConfidences/index'

import { StackedProgressBarSkeleton } from './skeleton'

interface StackedProgressBarProperties extends StyleProps {
  total?: number
  confidences: Confidence[]
  quantities: HealthConfidenceQuantites
  isLoading?: boolean
}

export interface Confidence {
  name: 'highConfidence' | 'mediumConfidence' | 'lowConfidence' | 'barrier'
  color: string
  bg: string
}
function percentage(partialValue: number, totalValue: number) {
  return `${Math.ceil((100 * partialValue) / totalValue)}%`
}

const StyledBarPiece = styled(Box)`
  &::before {
    content: '${({ confidenceNumber }) => confidenceNumber}';
  }
`

const getConfidenceQuantities =
  (quantities: HealthConfidenceQuantites) => (confidence: Confidence) => {
    const number = quantities?.[confidence.name] ?? 0

    return {
      ...confidence,
      quantity: number,
    }
  }

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
