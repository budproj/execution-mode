import React from 'react'

import { IntlLink } from 'src/components/Base'
import WrapperUserKeyResultsOverview, {
  UserKeyResultsOverviewProperties,
} from 'src/components/User/KeyResultsOverview/wrapper'

export interface KeyResultsOverviewColumnProperties extends UserKeyResultsOverviewProperties {}

const KeyResultOverview = ({
  userId,
  delta,
  latestCheckIn,
  isLoaded,
  progress,
  onClick,
}: KeyResultsOverviewColumnProperties) => {
  return (
    <IntlLink href={`/profile/${userId}`}>
      <WrapperUserKeyResultsOverview
        userId={userId}
        delta={delta}
        isLoaded={isLoaded}
        latestCheckIn={latestCheckIn}
        progress={progress}
        onClick={onClick}
      />
    </IntlLink>
  )
}

export default KeyResultOverview
