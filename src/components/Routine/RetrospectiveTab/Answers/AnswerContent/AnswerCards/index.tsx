import { Box } from '@chakra-ui/react'
import React from 'react'

import { routineAnswer } from '../../types'

import FeelingAnswerCard from './FeelingAnswerCard/feeling'
import LongTextAnswerCard from './LongTextAnswerCard/long-text'
import ProductivityAnswerCard from './ProductivityAnswerCard/productivity'
import RoadblockAnswerCard from './RoadblockAnswerCard/roadblock'

interface RoutineAnswerCardProperties {
  answerData: routineAnswer
}

const RoutineAnswerCard = ({ answerData }: RoutineAnswerCardProperties) => {
  switch (answerData.type) {
    case 'road_block':
      return <RoadblockAnswerCard answerData={answerData} />
    case 'long_text':
      return <LongTextAnswerCard answerData={answerData} />
    case 'emoji_scale':
      return <FeelingAnswerCard answerData={answerData} />
    case 'value_range':
      return <ProductivityAnswerCard answerData={answerData} />

    default:
      return <Box />
  }
}

export default RoutineAnswerCard
