import { Box } from '@chakra-ui/react'
import React from 'react'

import EmojiScaleQuestion from './EmojiScale'
import LongTextQuestion from './LongText'
import ReadingTextQuestion from './ReadingText'
import RoadBlockQuestion from './RoadBlock'
import ValueRangeQuestion from './ValueRange'
import { FormQuestion } from './types'

const RoutineFormQuestion = ({ ...rest }: FormQuestion) => {
  switch (rest.type) {
    case 'reading_text':
      return <ReadingTextQuestion {...rest} />
    case 'emoji_scale':
      return <EmojiScaleQuestion {...rest} />
    case 'long_text':
      return <LongTextQuestion {...rest} />
    case 'road_block':
      return <RoadBlockQuestion {...rest} />
    case 'value_range':
      return <ValueRangeQuestion {...rest} />
    default:
      return <Box />
  }
}

export default RoutineFormQuestion
