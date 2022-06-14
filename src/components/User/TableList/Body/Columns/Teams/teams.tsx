import { Flex, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import UsersTableListBodyColumnBase from 'src/components/User/TableList/Body/Columns/Base'
import UserTeamTags from 'src/components/User/TeamTags'
import { User } from 'src/components/User/types'
import buildPartialSelector from 'src/state/recoil/user/build-partial-selector'

export interface UsersTableListBodyColumnTeamsProperties {
  id: User['id']
  isActive?: boolean
}

const userTeamsSelector = buildPartialSelector<User['teams']>('teams')

const UsersTableListBodyColumnTeams = ({
  id,
  isActive,
}: UsersTableListBodyColumnTeamsProperties): ReactElement => {
  const userTeams = useRecoilValue(userTeamsSelector(id))

  const arrayUserTeams = userTeams?.edges.map((userTeam) => userTeam.node ?? [])

  const isTeamsLoaded = Boolean(arrayUserTeams)

  return (
    <UsersTableListBodyColumnBase>
      <Flex gridGap={2} flexDir="column">
        <Skeleton
          isLoaded={isTeamsLoaded}
          {...buildSkeletonMinSize(isTeamsLoaded, 140, 28)}
          maxWidth="min-content"
        >
          <UserTeamTags
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
