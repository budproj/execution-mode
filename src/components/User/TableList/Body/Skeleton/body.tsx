import { Box } from '@chakra-ui/react'
import React from 'react'

import UsersTableListBodyStaticSkeletonLine from 'src/components/User/TableList/Body/Static/skeleton-line'
import { UsersTableListBodyProperties } from 'src/components/User/TableList/Body/body'
import { User } from 'src/components/User/types'

export interface UsersTableListBodySkeletonProperties extends UsersTableListBodyProperties {
  amountOfLines: number
  userIDs?: Array<User['id']>
}

const UsersTableListBodySkeleton = ({
  amountOfLines,
  ...rest
}: UsersTableListBodySkeletonProperties) => (
  <Box>
    {[...[...new Array(amountOfLines)].keys()].map((key) => (
      <UsersTableListBodyStaticSkeletonLine key={`SKELETON_LINE_${key}`} {...rest} />
    ))}
  </Box>
)

UsersTableListBodySkeleton.defaultProps = {
  amountOfLines: 4,
}

export default UsersTableListBodySkeleton
