import { GridItem, Skeleton } from '@chakra-ui/react'
import React from 'react'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { PercentageProgressIncreaseTag } from 'src/components/Base'
import { Team } from 'src/components/Team/types'

export interface TeamsOverviewBodyTableBodyColumnProgressIncreaseProperties {
  team?: Team
}

const TeamsOverviewBodyTableBodyColumnProgressIncrease = ({
  team,
}: TeamsOverviewBodyTableBodyColumnProgressIncreaseProperties) => {
  const isLoaded = Boolean(team)

  return (
    <GridItem>
      <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 70, 21)}>
        <PercentageProgressIncreaseTag
          forcePositiveSignal
          showSignalArrow
          value={team?.progressIncreaseSinceLastWeek}
          bg="transparent"
          fontSize="md"
          minimumIntegerDigits={2}
          px={0}
        />
      </Skeleton>
    </GridItem>
  )
}

export default TeamsOverviewBodyTableBodyColumnProgressIncrease
