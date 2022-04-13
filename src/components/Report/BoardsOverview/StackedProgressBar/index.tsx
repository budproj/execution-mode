import { Flex, StyleProps, Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

interface StackedProgressBarProperties extends StyleProps {
  total: number
  confidences: Confidences[]
}

interface Confidences {
  name: string
  color: string
  bg: string
  number: number
}
function percentage(partialValue: number, totalValue: number) {
  return `${Math.floor((100 * partialValue) / totalValue)}%`
}

const StyledBarPiece = styled(Box)`
  &::before {
    content: '${({ confidenceNumber }) => confidenceNumber}';
  }
`

const StackedProgressBar = ({ confidences, total, ...rest }: StackedProgressBarProperties) => {
  return (
    <Flex
      bg="transparent"
      borderRadius="18px"
      mt="14px"
      w="100%"
      color="white"
      overflow="hidden"
      {...rest}
    >
      {confidences.map((confidence) => {
        return (
          <StyledBarPiece
            key={confidence.name}
            w={`${percentage(confidence.number, total)}`}
            bg={confidence.color}
            paddingLeft="10px"
            confidenceNumber={`${percentage(confidence.number, total)}`}
            fontSize="14px"
          />
        )
      })}
    </Flex>
  )
}

export default StackedProgressBar
