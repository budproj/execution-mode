import { Text } from '@chakra-ui/layout'
import React, { useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'

import { SearchableListContext } from 'src/components/Base/SearchableList/context'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { userAtomFamily } from 'src/state/recoil/user'

import { UserList } from '../../List/wrapper'
import { NamedAvatarSubtitleType } from '../../NamedAvatar/types'
import { User } from '../../types'

import messages from './messages'

type UsersInContextProperties = {
  avatarSubtitleType?: NamedAvatarSubtitleType
  isLoading?: boolean
  hasUserCard?: boolean
  onSelect?: (userID: string) => void | Promise<void>
}

export const UsersInContext = ({
  avatarSubtitleType,
  isLoading,
  hasUserCard,
  onSelect,
}: UsersInContextProperties) => {
  const { items } = useContext(SearchableListContext)
  const [loadUsers] = useRecoilFamilyLoader<User>(userAtomFamily)
  const intl = useIntl()

  const emptyState = <Text color="black.600">{intl.formatMessage(messages.emptySearchState)}</Text>

  useEffect(() => {
    loadUsers(items)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  return (
    <UserList
      users={items}
      showUserCard={hasUserCard}
      isLoading={isLoading}
      avatarSubtitleType={avatarSubtitleType}
      emptyState={emptyState}
      onUserClick={onSelect}
    />
  )
}