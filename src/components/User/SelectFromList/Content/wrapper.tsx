import React, { useContext } from 'react'
import { MessageDescriptor } from 'react-intl'

import { SearchableListContext } from 'src/components/Base/SearchableList/context'

import { NamedAvatarSubtitleType } from '../../NamedAvatar/types'

import { SelectUserFromListEmptyState } from './empty-state'
import { SelectUserFromListOptions } from './options'
import { UsersInContext } from './users-in-context'

type SelectFromListContentProperties = {
  onCreateStart: () => void
  emptyStateTitle?: MessageDescriptor
  hasUserCard?: boolean
  isLoading?: boolean
  hasCreatePermission?: boolean
  avatarSubtitleType?: NamedAvatarSubtitleType
  hasMenu?: boolean
  onSelect?: (userID: string) => void | Promise<void>
}

export const SelectUserFromListContent = ({
  hasCreatePermission,
  onCreateStart,
  hasUserCard,
  isLoading,
  avatarSubtitleType,
  onSelect,
  emptyStateTitle,
  hasMenu,
}: SelectFromListContentProperties) => {
  const { items } = useContext(SearchableListContext)

  const hasMembers = items.length > 0

  return hasMembers || isLoading ? (
    <>
      {hasCreatePermission && <SelectUserFromListOptions onCreateStart={onCreateStart} />}

      <UsersInContext
        hasUserCard={hasUserCard}
        isLoading={isLoading}
        avatarSubtitleType={avatarSubtitleType}
        onSelect={onSelect}
        hasMenu={hasMenu}
      />
    </>
  ) : (
    <SelectUserFromListEmptyState
      title={emptyStateTitle}
      hasCreatePermission={hasCreatePermission}
      onCreateStart={onCreateStart}
    />
  )
}
