import { GridItem } from '@chakra-ui/react'
import React from 'react'

import { PercentageProgressIncreaseTag } from 'src/components/Base'
import { Team } from 'src/components/Team/types'

export interface TeamsOverviewBodyTableBodyColumnProgressIncreaseProperties {
  team?: Team
}

const TeamsOverviewBodyTableBodyColumnProgressIncrease = ({
  team,
}: TeamsOverviewBodyTableBodyColumnProgressIncreaseProperties) => {
  return (
    <GridItem>
      <PercentageProgressIncreaseTag
        forcePositiveSignal
        showSignalArrow
        value={team?.progressIncreaseSinceLastWeek}
        bg="transparent"
        fontSize="md"
        minimumIntegerDigits={2}
      />
    </GridItem>
  )
}

export default TeamsOverviewBodyTableBodyColumnProgressIncrease
