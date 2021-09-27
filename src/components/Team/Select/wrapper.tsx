import { useLazyQuery } from '@apollo/client'
import { MenuItem } from '@chakra-ui/react'
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
  filter?: string
  teams?: TeamData[]
  teamIDsBlacklist?: string[]
  onSelect: (teamID: string) => () => void
}

type GetReachableTeamsResponse = {
  teams: GraphQLConnection<Team>
}

export const TeamSelect = ({
  filter,
  teams,
  teamIDsBlacklist,
  onSelect,
}: TeamTagListProperties) => {
  const [currentTeams, setCurrentTeams] = useState<TeamData[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [remoteTeams, setRemoteTeamEdges, _, isRemoteTeamsLoaded] = useConnectionEdges<Team>()

  const [getReachableTeams] = useLazyQuery<GetReachableTeamsResponse>(queries.GET_REACHABLE_TEAMS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setRemoteTeamEdges(data.teams.edges)
    },
  })

  const whitelistedTeams = currentTeams.filter((team) => !teamIDsBlacklist?.includes(team.id))
  const filteredTeams = whitelistedTeams.filter((team) =>
    filter ? team.name.toLowerCase().includes(filter.toLowerCase()) : true,
  )

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
    <>
      {filteredTeams.map((team) => (
        <MenuItem
          key={team.id}
          py={4}
          justifyContent="flex-start"
          h="full"
          fontWeight={400}
          borderBottomWidth={1}
          color="new-gray.800"
          borderColor="new-gray.300"
          _hover={{ color: 'brand.500' }}
          _focus={{ color: 'brand.500' }}
          _active={{}}
          _last={{ borderBottomWidth: 0, pb: 2 }}
          onClick={onSelect(team.id)}
        >
          {team.name}
        </MenuItem>
      ))}
    </>
  )
}
