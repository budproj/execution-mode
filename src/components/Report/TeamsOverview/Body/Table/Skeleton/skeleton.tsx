import React from 'react'

import TeamsOverviewBodyTableBody from 'src/components/Report/TeamsOverview/Body/Table/Body'

export interface TeamsOverviewBodyTableSkeletonProperties {
  numberOfLines: number
  isGameficationDisabled?: boolean
}

const TeamsOverviewBodyTableSkeleton = ({
  numberOfLines,
  isGameficationDisabled,
}: TeamsOverviewBodyTableSkeletonProperties) => {
  const skeletonContent = [...new Array(numberOfLines)]

  return (
    <TeamsOverviewBodyTableBody
      teamsRanking={skeletonContent}
      isGameficationDisabled={isGameficationDisabled}
    />
  )
}

TeamsOverviewBodyTableSkeleton.defaultProps = {
  numberOfLines: 3,
}

export default TeamsOverviewBodyTableSkeleton
