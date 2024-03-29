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
  const progress = team?.delta.progress ?? 0

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
