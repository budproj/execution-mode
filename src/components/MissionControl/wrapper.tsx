import { HStack, StyleProps } from '@chakra-ui/react'
import React from 'react'

import BestPracticesLighthouse from './BestPracticesLighthouse'

interface MissionControlWrapperProperties extends StyleProps {}

const MissionControlWrapper = ({ ...rest }: MissionControlWrapperProperties) => {
  return (
    <HStack {...rest}>
      <BestPracticesLighthouse />
    </HStack>
  )
}

export default MissionControlWrapper
