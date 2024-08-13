import { useMutation } from '@apollo/client'
import { MenuButton, Menu, MenuList, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { TeamSearch } from 'src/components/Team/Search/wrapper'
import { TeamSelect } from 'src/components/Team/Select/wrapper'
import TeamTag from 'src/components/Team/Tag'
import { Team } from 'src/components/Team/types'
import { GraphQLConnection } from 'src/components/types'
import { userSelector } from 'src/state/recoil/user'
import { isAddTeamLoadingAtom } from 'src/state/recoil/user/add-team-loading'

import queries from './queries.gql'

type AddUserTeamProperties = {
  userID?: string
  teamIDsBlacklist: string[]
}

export interface AddUserToTeamMutationResult {
  addTeamToUser: {
    id: string
    teams: GraphQLConnection<Team>
  }
}

export const AddUserTeam = ({ userID, teamIDsBlacklist }: AddUserTeamProperties) => {
  const [filter, setFilter] = useState('')
  const setUser = useSetRecoilState(userSelector(userID))
  const setIsAddTeamLoading = useSetRecoilState(isAddTeamLoadingAtom)
  const [addTeamToUser, { loading }] = useMutation<AddUserToTeamMutationResult>(
    queries.ADD_TEAM_TO_USER,
    {
      onCompleted: (data) => {
        setUser(data.addTeamToUser)
        setIsAddTeamLoading(false)
      },
    },
  )

  const handleSearch = (value: string) => {
    if (filter !== value) setFilter(value)
  }

  const handleSelect = (teamID: string) => () => {
    setIsAddTeamLoading(true)
    void addTeamToUser({
      variables: {
        userID,
        teamID,
      },
    })
  }

  return (
    <Menu closeOnSelect placement="bottom-end">
      <MenuButton>
        {loading ? (
          <Spinner color="brand.500" />
        ) : (
          <TeamTag
            p={3}
            fontSize="md"
            cursor="pointer"
            _hover={{ bg: 'brand.500', color: 'white' }}
            transition="all ease-in-out .3s"
          >
            +
          </TeamTag>
        )}
      </MenuButton>
      <MenuList p={4} boxShadow="with-stroke.light" borderColor="new-gray.200" borderWidth={1}>
        <TeamSearch onSearch={handleSearch} />
        <TeamSelect
          hasScroll
          teamIDsBlacklist={teamIDsBlacklist}
          filter={filter}
          onSelect={handleSelect}
        />
      </MenuList>
    </Menu>
  )
}
