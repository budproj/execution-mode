import { Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import UsersTableListBodyColumnBase from 'src/components/User/TableList/Body/Columns/Base'

const UsersTableListBodyColumnRoleSkeleton = (): ReactElement => (
  <UsersTableListBodyColumnBase>
    <Skeleton h={8} w="full" />
  </UsersTableListBodyColumnBase>
)

export default UsersTableListBodyColumnRoleSkeleton
