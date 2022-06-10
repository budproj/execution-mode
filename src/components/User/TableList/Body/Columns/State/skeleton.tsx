import { Flex, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import UsersTableListBodyColumnBase from 'src/components/User/TableList/Body/Columns/Base'

const UsersTableListBodyColumnStateSkeleton = (): ReactElement => (
  <UsersTableListBodyColumnBase>
    <Flex gridGap={2} flexDir="column">
      <Skeleton w="full" h={8} />
    </Flex>
  </UsersTableListBodyColumnBase>
)

export default UsersTableListBodyColumnStateSkeleton
