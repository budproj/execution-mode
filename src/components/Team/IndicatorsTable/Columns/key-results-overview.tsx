import React from 'react'

import UserKeyResultsOverview, {
  UserKeyResultsOverviewProperties,
} from 'src/components/User/KeyResultsOverview'

export interface KeyResultsOverviewColumnProperties extends UserKeyResultsOverviewProperties {}

const KeyResultOverview = ({
  userId,
  delta,
  latestCheckIn,
  progress,
}: KeyResultsOverviewColumnProperties) => {
  return (
    <UserKeyResultsOverview
      userId={userId}
      delta={delta}
      latestCheckIn={latestCheckIn}
      progress={progress}
    />
  )
}

export default KeyResultOverview
