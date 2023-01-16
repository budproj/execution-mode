import React from 'react'

import { Team } from 'src/components/Team/types'

import { Highlights } from './highlights'

interface TeamMembersWrapperProperties {
  teamID?: Team['id']
  isLoading?: boolean
}

export const TeamHighlightsWrapper = ({ teamID, isLoading }: TeamMembersWrapperProperties) => {
  return <Highlights teamId={teamID} isLoading={isLoading} />
}
