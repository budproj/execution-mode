import React from 'react'

import { IntlLink } from 'src/components/Base'
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
    <IntlLink href={`/profile/${userId}`}>
      <UserKeyResultsOverview
        userId={userId}
        delta={delta}
        latestCheckIn={latestCheckIn}
        progress={progress}
      />
    </IntlLink>
  )
}

export default KeyResultOverview
