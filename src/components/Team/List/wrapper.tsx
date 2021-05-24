import { Stack } from '@chakra-ui/layout'
import React from 'react'

import { Team } from '../types'

import { TeamListSingle } from './single'
import { TeamListSkeleton } from './skeleton'

interface TeamListProperties {
  teams: Team[]
  isLoading?: boolean
}

export const TeamList = ({ teams, isLoading }: TeamListProperties) => (
  <Stack>
    {isLoading ? (
      <TeamListSkeleton />
    ) : (
      teams.map((team) => <TeamListSingle key={team.id} team={team} />)
    )}
  </Stack>
)
