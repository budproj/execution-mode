import React from 'react'

import TeamsOverviewBodyTableBody from 'src/components/Report/TeamsOverview/Body/Table/Body'

export interface TeamsOverviewBodyTableSkeletonProperties {
  numberOfLines: number
}

const TeamsOverviewBodyTableSkeleton = ({
  numberOfLines,
}: TeamsOverviewBodyTableSkeletonProperties) => {
  const skeletonContent = [...new Array(numberOfLines)]

  return <TeamsOverviewBodyTableBody teamsRanking={skeletonContent} />
}

TeamsOverviewBodyTableSkeleton.defaultProps = {
  numberOfLines: 3,
}

export default TeamsOverviewBodyTableSkeleton
