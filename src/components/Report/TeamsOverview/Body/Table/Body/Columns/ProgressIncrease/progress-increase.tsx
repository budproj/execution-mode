import { GridItem, Skeleton } from '@chakra-ui/react'
import React from 'react'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { PercentageProgressIncreaseTag } from 'src/components/Base'
// Import { Team } from 'src/components/Team/types'

export interface TeamsOverviewBodyTableBodyColumnProgressIncreaseProperties {
  // Alterar esse any para Team + latest Check in, mesma coisa no back
  team?: any
}

const TeamsOverviewBodyTableBodyColumnProgressIncrease = ({
  team,
}: TeamsOverviewBodyTableBodyColumnProgressIncreaseProperties) => {
  const isLoaded = Boolean(team)
  const progress = team?.deltas.progress ?? 0

  return (
    <GridItem textAlign="right">
      <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 70, 21)}>
        <PercentageProgressIncreaseTag
          forcePositiveSignal
          showSignalArrow
          value={progress}
          fontSize="sm"
          p={2}
          gridGap={2}
        />
      </Skeleton>
    </GridItem>
  )
}

export default TeamsOverviewBodyTableBodyColumnProgressIncrease
