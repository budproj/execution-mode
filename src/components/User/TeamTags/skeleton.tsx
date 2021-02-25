import { Stack } from '@chakra-ui/react'
import React from 'react'

import TeamTag from 'src/components/Team/Tag'

export interface UserTeamTagsSkeletonProperties {
  numberOfTeams: number
}

const UserTeamTagsSkeleton = ({ numberOfTeams }: UserTeamTagsSkeletonProperties) => (
  <Stack spacing={2} direction="row">
    {[...new Array(numberOfTeams)].map(() => (
      <TeamTag key={Math.random()} w={20} />
    ))}
  </Stack>
)

UserTeamTagsSkeleton.defaultProps = {
  numberOfTeams: 3,
}

export default UserTeamTagsSkeleton
