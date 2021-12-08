import { useQuery } from '@apollo/client'
import { Box } from '@chakra-ui/layout'
import { MenuProps } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { TeamListSearchable } from 'src/components/Page/Team/ChildTeams/team-list-searchable'
import { Team } from 'src/components/Team/types'
import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { teamAtomFamily } from 'src/state/recoil/team'

import SelectMenu from '../../Base/SelectMenu'
import { NamedAvatar } from '../../User'
import { AllReachableUsers } from '../../User/AllReachableUsers/wrapper'
import { NamedAvatarSubtitleType } from '../../User/NamedAvatar/types'

import queries from './queries.gql'

interface TeamSelectMenuProperties {
  value: string
  onChange?: (newOwnerID: string) => void
  avatarSubtitleType?: NamedAvatarSubtitleType
  placement?: MenuProps['placement']
}

export interface GetTeamListQueryResult {
  teams: GraphQLConnection<Team>
}

export const TeamSelectMenu = ({
  value,
  onChange,
  avatarSubtitleType,
  placement,
}: TeamSelectMenuProperties) => {
  const [isOpen, setIsOpen] = useState(false)

  const { data } = useQuery<GetTeamListQueryResult>(queries.GET_TEAM_LIST)
  const [reachableTeams, setTeamEdges] = useConnectionEdges<Team>()
  const [loadTeams] = useRecoilFamilyLoader(teamAtomFamily)

  useEffect(() => {
    if (data) setTeamEdges(data.teams.edges)
  }, [data])

  useEffect(() => {
    if (reachableTeams) loadTeams(reachableTeams)
  }, [reachableTeams])

  const handleChange = (newOwnerID: string | string[]) => {
    if (Array.isArray(newOwnerID)) throw new Error('Cannot parse string array')
    if (onChange) onChange(newOwnerID)
    handleClose()
  }

  const handleOpen = () => !isOpen && setIsOpen(true)
  const handleClose = () => isOpen && setIsOpen(false)

  return (
    <SelectMenu
      matchWidth
      isLazy
      closeOnSelect
      isOpen={isOpen}
      value={value}
      placement={placement}
      placeholder={
        <NamedAvatar
          userID={value}
          avatarSize={9}
          displaySubtitle={false}
          horizontalGap={2}
          nameColor="gray.500"
        />
      }
      onOpen={handleOpen}
      onClose={handleClose}
      onChange={handleChange}
    >
      <Box p={4} maxH="full" h="full">
        <TeamListSearchable isLoading teams={reachableTeams} />
        <AllReachableUsers avatarSubtitleType={avatarSubtitleType} onSelect={handleChange} />
      </Box>
    </SelectMenu>
  )
}
