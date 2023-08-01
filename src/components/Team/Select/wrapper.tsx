import { useLazyQuery } from '@apollo/client'
import { MenuItemOption } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'

import { Team } from '../types'

import queries from './queries.gql'
import { StyledTeamSelectWrapper } from './styled-wrapper'

type TeamData = {
  id: string
  name: string
}

type TeamTagListProperties = {
  hasScroll?: boolean
  filter?: string
  teams?: TeamData[]
  teamIDsBlacklist?: string[]
  onSelect: (teamID: string, teamName?: string) => () => void
  emptyLabel?: string
}

type GetReachableTeamsResponse = {
  teams: GraphQLConnection<Team>
}

export const TeamSelect = ({
  hasScroll,
  filter,
  teams,
  teamIDsBlacklist,
  onSelect,
  emptyLabel,
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
  const teamsWithEmptyLabel = emptyLabel
    ? [{ id: '', name: emptyLabel }, ...filteredTeams]
    : filteredTeams

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
    <StyledTeamSelectWrapper hasScroll={hasScroll}>
      {teamsWithEmptyLabel.map((team) => (
        <MenuItemOption
          key={team.id}
          justifyContent="flex-start"
          h="full"
          fontWeight={400}
          color="new-gray.800"
          borderBottomWidth={0}
          // eslint-disable-next-line unicorn/no-null
          icon={null}
          _hover={{ color: 'brand.500' }}
          _focus={{ color: 'brand.500' }}
          _last={{ pb: 2 }}
          _active={{}}
          onClick={onSelect(team.id, team.name)}
        >
          {team.name}
        </MenuItemOption>
      ))}
    </StyledTeamSelectWrapper>
  )
}
