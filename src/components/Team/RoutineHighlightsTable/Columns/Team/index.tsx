import { Flex, Skeleton } from '@chakra-ui/react'
import React from 'react'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import UserTeamTags from 'src/components/User/TeamTags'
import { useGetUserDetails } from 'src/components/User/hooks'
import { User } from 'src/components/User/types'

export interface RoutinesHighlightsTableTeamColumnProperties {
  userId: User['id']
}

const RoutinesHighlightsTableTeamColumn = ({
  userId,
}: RoutinesHighlightsTableTeamColumnProperties) => {
  const { data: userDetails } = useGetUserDetails(userId)

  const arrayUserTeams = userDetails?.teams?.edges.map((userTeam) => userTeam.node ?? [])

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
