import { Flex, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import UsersTableListBodyColumnBase from 'src/components/User/TableList/Body/Columns/Base'
import UserTeamTags from 'src/components/User/TeamTags'
import { User, UserStatus } from 'src/components/User/types'
import buildPartialSelector from 'src/state/recoil/user/build-partial-selector'

export interface UsersTableListBodyColumnTeamsProperties {
  id: User['id']
}

const userTeamsSelector = buildPartialSelector<User['teams']>('teams')
const stateOfUserSelector = buildPartialSelector<User['status']>('status')

const UsersTableListBodyColumnTeams = ({
  id,
}: UsersTableListBodyColumnTeamsProperties): ReactElement => {
  const userTeams = useRecoilValue(userTeamsSelector(id))
  const isActive = useRecoilValue(stateOfUserSelector(id)) === UserStatus.ACTIVE

  const arrayUserTeams = userTeams?.edges.map((userTeam) => userTeam.node ?? [])

  // Const linkTo = team?.id ? `/explore/${team?.id}` : ''

  const isTeamsLoaded = Boolean(arrayUserTeams)

  return (
    <UsersTableListBodyColumnBase>
      <Flex gridGap={2} flexDir="column">
        <Skeleton isLoaded={isTeamsLoaded} {...buildSkeletonMinSize(isTeamsLoaded, 140, 28)}>
          <UserTeamTags
            redirectToTeam
            userID={id}
            max={2}
            isLoaded={isTeamsLoaded}
            isActive={isActive}
            teams={arrayUserTeams}
          />
        </Skeleton>
      </Flex>
    </UsersTableListBodyColumnBase>
  )
}

export default UsersTableListBodyColumnTeams
