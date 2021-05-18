import { Stack } from '@chakra-ui/layout'
import React from 'react'

import ChildTeamsObjectives from '../../../Team/ChildTeamsObjectives'
import { TeamSectionHeading } from '../Section/SectionHeading/wrapper'

type TeamObjectivesWrapperProperties = {
  teamID: string
}

export const TeamObjectivesWrapper = ({ teamID }: TeamObjectivesWrapperProperties) => (
  <Stack>
    <TeamSectionHeading>OKR trimestrais Q2 21</TeamSectionHeading>
    <ChildTeamsObjectives rootTeamId={teamID} />
  </Stack>
)
