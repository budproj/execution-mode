import { Stack } from '@chakra-ui/layout'
import React from 'react'

import { Team } from '../types'

import { TeamListSingle } from './single'
import { TeamListSkeleton } from './skeleton'

interface TeamListProperties {
  teams: Team[]
  isLoaded?: boolean
}

export const TeamList = ({ teams, isLoaded }: TeamListProperties) => (
  <Stack>
    {isLoaded ? (
      teams.map((team) => <TeamListSingle key={team.id} team={team} />)
    ) : (
      <TeamListSkeleton />
    )}
  </Stack>
)
