import { Flex, Skeleton } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import UserTeamTags from 'src/components/User/TeamTags'
import { useGetUserDetails } from 'src/components/User/hooks'
import { User } from 'src/components/User/types'

export const CustomFlex = styled(Flex)`
  @media (min-width: 1600px) {
    width: 320px;
  }

  @media (max-width: 1417px) {
    width: 220px;
  }
`
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
    <CustomFlex gridGap={2} flexDir="column">
      <Skeleton isLoaded={isTeamsLoaded} {...buildSkeletonMinSize(isTeamsLoaded, 140, 28)}>
        <UserTeamTags
          redirectToTeam
          userID={userId}
          max={2}
          isLoaded={isTeamsLoaded}
          teams={arrayUserTeams}
        />
      </Skeleton>
    </CustomFlex>
  )
}

export default RoutinesHighlightsTableTeamColumn
