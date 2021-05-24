import { Stack } from '@chakra-ui/layout'
import React from 'react'

import { Team } from '../types'

import { TeamListSingle } from './single'

interface TeamListProperties {
  teams: Team[]
}

export const TeamList = ({ teams }: TeamListProperties) => (
  <Stack>
    {teams.map((team) => (
      <TeamListSingle key={team.id} team={team} />
    ))}
  </Stack>
)
