import { useMutation } from '@apollo/client'
import { Wrap, WrapItem } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import TeamTag from 'src/components/Team/Tag'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { userSelector } from 'src/state/recoil/user'
import { isAddTeamLoadingAtom } from 'src/state/recoil/user/add-team-loading'

import queries from './queries.gql'
import UserTeamTagsSkeleton from './skeleton'

export interface UserTeamTagsProperties {
  teams?: Team[]
  userID?: User['id']
  redirectToTeam?: boolean
  onRemove?: () => void
  isLoaded?: boolean
  isActive?: boolean
  isEditable?: boolean
  max?: number
}

interface RemoveTeamFromUserMutationResult {
  removeTeamFromUser: {
    id: string
    teams: GraphQLConnection<Team>
  }
}

const UserTeamTags = ({
  teams,
  userID,
  isLoaded,
  isActive,
  redirectToTeam,
  onRemove,
  isEditable,
  max,
}: UserTeamTagsProperties) => {
  const [user, setUser] = useRecoilState(userSelector(userID))
  const [remoteTeams, setTeamEdges] = useConnectionEdges<Team>()
  const [isAddTeamLoading, setIsAddTeamLoading] = useRecoilState(isAddTeamLoadingAtom)
  const [removeTeamFromUser, { loading }] = useMutation<RemoveTeamFromUserMutationResult>(
    queries.REMOVE_TEAM_FROM_USER,
    {
      onCompleted: (data) => {
        setIsAddTeamLoading(false)
        setUser(data.removeTeamFromUser)
        if (onRemove) void onRemove()
      },
    },
  )

  const userTeams = teams ?? remoteTeams
  const limitedTeams = userTeams?.slice(0, max)
  const hasMoreThanOneTeam = limitedTeams.length > 1
  const handleRemoveTeam = (teamID: string) => () => {
    setIsAddTeamLoading(true)
    void removeTeamFromUser({
      variables: {
        teamID,
        userID,
      },
    })
  }

  useEffect(() => {
    if (user && !teams) setTeamEdges(user.teams?.edges)
  }, [user, teams, setTeamEdges])

  return isLoaded && limitedTeams ? (
    <Wrap spacing={2}>
      {limitedTeams.map((team) => (
        <WrapItem key={team.id} overflow="hidden" cursor={redirectToTeam ? 'pointer' : 'default'}>
          {redirectToTeam ? (
            <Link passHref href={redirectToTeam ? `/explore/${team?.id}` : ''}>
              <TeamTag
                redirectToTeam={redirectToTeam}
                isLoading={loading}
                isActive={isActive}
                isDisabled={isAddTeamLoading}
                onClose={isEditable && hasMoreThanOneTeam ? handleRemoveTeam(team.id) : undefined}
              >
                {team.name}
              </TeamTag>
            </Link>
          ) : (
            <TeamTag
              redirectToTeam={redirectToTeam}
              isLoading={loading}
              isDisabled={isAddTeamLoading}
              isActive={isActive}
              onClose={isEditable && hasMoreThanOneTeam ? handleRemoveTeam(team.id) : undefined}
            >
              {team.name}
            </TeamTag>
          )}
        </WrapItem>
      ))}
    </Wrap>
  ) : (
    <UserTeamTagsSkeleton />
  )
}

export default UserTeamTags
