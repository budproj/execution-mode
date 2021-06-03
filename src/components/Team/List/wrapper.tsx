import { Stack } from '@chakra-ui/layout'
import { Divider } from '@chakra-ui/react'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { Team } from '../types'

import { TeamListSingle } from './single'
import { TeamListSkeleton } from './skeleton'

interface TeamListProperties {
  teams: Team[]
  isLoading?: boolean
}

export const TeamList = ({ teams, isLoading }: TeamListProperties) => (
  <PerfectScrollbar>
    <Stack spacing={8} p={3}>
      {isLoading ? (
        <TeamListSkeleton />
      ) : (
        teams.map((team, index) => (
          <React.Fragment key={team.id}>
            <TeamListSingle team={team} />
            {index < teams.length - 1 && (
              <Divider borderColor="black.100" bg="black.100" opacity={1} />
            )}
          </React.Fragment>
        ))
      )}
    </Stack>
  </PerfectScrollbar>
)
