import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

import Board from '../Board'
import StackedProgressBar from '../StackedProgressBar'

import { confidenceTexts } from './constants'

const BoardsOverview = ({ ...rest }) => {
  return (
    <Flex bg="white" width="100%" paddingY={15} paddingX={18} {...rest}>
      <Board title="Resultados-Chave" number="81" bg="new-gray.300" minWidth="175px" size="lg" />
      <Box w="100%" paddingX="23px">
        <Flex justifyContent="space-between" gridGap="24px">
          {confidenceTexts.map((confidence) => {
            return (
              <Board
                key={confidence.name}
                uppercase
                flex="1"
                title={confidence.name}
                color={confidence.color}
                number={confidence.number}
                bg={confidence.bg}
                paddingX={30}
              />
            )
          })}
        </Flex>
        <StackedProgressBar total={81} confidences={confidenceTexts} />
      </Box>
    </Flex>
  )
}

export default BoardsOverview
