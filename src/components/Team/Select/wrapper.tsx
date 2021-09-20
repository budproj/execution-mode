import { useLazyQuery } from '@apollo/client'
import { Stack, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'

import { Team } from '../types'

import queries from './queries.gql'

type TeamData = {
  id: string
  name: string
}

type TeamTagListProperties = {
  teams?: TeamData[]
}

type GetReachableTeamsResponse = {
  teams: GraphQLConnection<Team>
}

export const TeamSelect = ({ teams }: TeamTagListProperties) => {
  const [currentTeams, setCurrentTeams] = useState<TeamData[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [remoteTeams, setRemoteTeamEdges, _, isRemoteTeamsLoaded] = useConnectionEdges<Team>()

  const [getReachableTeams] = useLazyQuery<GetReachableTeamsResponse>(queries.GET_REACHABLE_TEAMS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setRemoteTeamEdges(data.teams.edges)
    },
  })

  useEffect(() => {
    if (teams) {
      setCurrentTeams(teams)
      setIsLoaded(true)
    }
  }, [teams, setCurrentTeams, setIsLoaded])

  useEffect(() => {
    if (isRemoteTeamsLoaded && remoteTeams.length > 0) {
      setCurrentTeams(remoteTeams)
      setIsLoaded(true)
    }
  }, [remoteTeams, isRemoteTeamsLoaded, setIsLoaded, setCurrentTeams])

  useEffect(() => {
    if (!teams && !isLoaded) getReachableTeams()
  }, [isLoaded, teams, getReachableTeams])

  return (
    <Stack>
      {currentTeams.map((team) => (
        <Button
          key={team.id}
          variant="text"
          py={4}
          justifyContent="flex-start"
          h="full"
          fontWeight={400}
          borderBottomWidth={1}
          borderColor="new-gray.300"
          _hover={{ color: 'brand.500' }}
          _last={{ borderBottomWidth: 0 }}
        >
          {team.name}
        </Button>
      ))}
    </Stack>
  )
}
