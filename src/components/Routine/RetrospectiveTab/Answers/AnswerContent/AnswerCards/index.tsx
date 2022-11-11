import { Box } from '@chakra-ui/react'
import React from 'react'

import { User } from 'src/components/User/types'

import { routineAnswer } from '../../types'

import FeelingAnswerCard from './FeelingAnswerCard/feeling'
import LongTextAnswerCard from './LongTextAnswerCard/long-text'
import ProductivityAnswerCard from './ProductivityAnswerCard/productivity'
import RoadblockAnswerCard from './RoadblockAnswerCard/roadblock'

interface RoutineAnswerCardProperties {
  answerData: routineAnswer
  userThatAnswered: Partial<User>
}

const RoutineAnswerCard = ({ answerData, userThatAnswered }: RoutineAnswerCardProperties) => {
  switch (answerData.type) {
    case 'road_block':
      return <RoadblockAnswerCard answerData={answerData} user={userThatAnswered} />
    case 'long_text':
      return <LongTextAnswerCard answerData={answerData} />
    case 'emoji_scale':
      return <FeelingAnswerCard answerData={answerData} user={userThatAnswered} />
    case 'value_range':
      return <ProductivityAnswerCard answerData={answerData} user={userThatAnswered} />

    default:
      return <Box />
  }
}

export default RoutineAnswerCard
