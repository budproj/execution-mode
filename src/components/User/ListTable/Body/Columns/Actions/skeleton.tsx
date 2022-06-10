import { Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import UsersTableListBodyColumnBase from 'src/components/User/ListTable/Body/Columns/Base'

const UsersTableListBodyColumnActionsSkeleton = (): ReactElement => (
  <UsersTableListBodyColumnBase preventLineClick>
    <Skeleton w={12} h={12} borderRadius={4} />
  </UsersTableListBodyColumnBase>
)

export default UsersTableListBodyColumnActionsSkeleton
