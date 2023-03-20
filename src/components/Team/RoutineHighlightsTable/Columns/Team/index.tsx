import { Flex, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import UserTeamTags from 'src/components/User/TeamTags'
import { User } from 'src/components/User/types'
import buildPartialSelector from 'src/state/recoil/cycle/build-partial-selector'

export interface RoutinesHighlightsTableTeamColumnProperties {
  userId: User['id']
}

const userTeamsSelector = buildPartialSelector<User['teams']>('teams')

const RoutinesHighlightsTableTeamColumn = ({
  userId,
}: RoutinesHighlightsTableTeamColumnProperties) => {
  const userTeams = useRecoilValue(userTeamsSelector(userId))

  const arrayUserTeams = userTeams?.edges.map((userTeam) => userTeam.node ?? [])

  const isTeamsLoaded = Boolean(arrayUserTeams)

  return (
    <Flex gridGap={2} flexDir="column">
      <Skeleton isLoaded={isTeamsLoaded} {...buildSkeletonMinSize(isTeamsLoaded, 140, 28)}>
        <UserTeamTags
          redirectToTeam
          userID={userId}
          max={2}
          isLoaded={isTeamsLoaded}
          teams={arrayUserTeams}
        />
      </Skeleton>
    </Flex>
  )
}

export default RoutinesHighlightsTableTeamColumn
