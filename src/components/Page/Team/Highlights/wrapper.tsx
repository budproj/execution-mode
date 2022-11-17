import React from 'react'

import { Team } from 'src/components/Team/types'

import { Highlights } from './highlights'

interface TeamMembersWrapperProperties {
  teamID?: Team['id']
}

export const TeamHighlightsWrapper = ({ teamID }: TeamMembersWrapperProperties) => {
  return <Highlights teamId={teamID} />
}
