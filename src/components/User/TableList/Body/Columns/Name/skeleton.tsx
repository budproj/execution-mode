import { Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import UsersTableListBodyColumnBase from 'src/components/User/TableList/Body/Columns/Base'

const UsersTableListBodyColumnNameSkeleton = (): ReactElement => (
  <UsersTableListBodyColumnBase>
    <Skeleton h={8} w="full" />
  </UsersTableListBodyColumnBase>
)

export default UsersTableListBodyColumnNameSkeleton
