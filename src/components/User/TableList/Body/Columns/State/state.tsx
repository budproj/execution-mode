import { Flex, Skeleton, Tag, TagLabel } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import UsersTableListBodyColumnBase from 'src/components/User/TableList/Body/Columns/Base'
import { User, UserStatus } from 'src/components/User/types'
import buildPartialSelector from 'src/state/recoil/user/build-partial-selector'

import messages from './messages'

export interface UsersTableListBodyColumnStateProperties {
  id: User['id']
}
const stateOfUserSelector = buildPartialSelector<User['status']>('status')

const UsersTableListBodyColumnState = ({
  id,
}: UsersTableListBodyColumnStateProperties): ReactElement => {
  const intl = useIntl()

  const stateOfUser = useRecoilValue(stateOfUserSelector(id))

  const userStatusLabel =
    stateOfUser === UserStatus.ACTIVE
      ? intl.formatMessage(messages.userAccountIsActiveTitleOption)
      : intl.formatMessage(messages.userAccountIsNotActiveTitleOption)

  const isStateOfUserLoaded = Boolean(stateOfUser)

  return (
    <UsersTableListBodyColumnBase>
      <Flex gridGap={2} flexDir="column">
        <Skeleton
          isLoaded={isStateOfUserLoaded}
          {...buildSkeletonMinSize(isStateOfUserLoaded, 40, 28)}
        >
          <Tag
            bg="brand.50"
            color={stateOfUser === UserStatus.ACTIVE ? 'brand.500' : 'new-gray.500'}
            textTransform="uppercase"
            fontWeight={500}
            fontSize={10}
            borderRadius={3}
            px={3}
            py={1}
          >
            <TagLabel>{userStatusLabel.toUpperCase()}</TagLabel>
          </Tag>
        </Skeleton>
      </Flex>
    </UsersTableListBodyColumnBase>
  )
}

export default UsersTableListBodyColumnState
