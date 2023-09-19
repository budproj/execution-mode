import { HStack, StyleProps } from '@chakra-ui/react'
import React from 'react'

import BestPracticesLighthouse from './BestPracticesLighthouse'

interface MissionControlWrapperProperties extends StyleProps {
  userID: string
  teamID: string
}

const MissionControlWrapper = ({ userID, teamID, ...rest }: MissionControlWrapperProperties) => {
  return (
    <HStack {...rest} w="100%">
      <BestPracticesLighthouse teamID={teamID} />
      {/* <MissionControlTasksWrapper userID={userID} teamID={teamID} /> */}
    </HStack>
  )
}

export default MissionControlWrapper
