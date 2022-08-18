import React, { useContext } from 'react'
import { MessageDescriptor } from 'react-intl'

import { SearchableListContext } from 'src/components/Base/SearchableList/context'

import { NamedAvatarSubtitleType } from '../../NamedAvatar/types'
import { User } from '../../types'

import { SelectUserFromListEmptyState } from './empty-state'
import { SelectUserFromListOptions } from './options'
import { UsersInContext } from './users-in-context'

type SelectFromListContentProperties = {
  onCreateStart: () => void
  onAddUserToTeam: () => void
  emptyStateTitle?: MessageDescriptor
  hasUserCard?: boolean
  isLoading?: boolean
  isSelectingMultiples?: boolean
  hasCreatePermission?: boolean
  avatarSubtitleType?: NamedAvatarSubtitleType
  hasMenu?: boolean
  onSelect?: (userID: string) => void | Promise<void>
  teamLeader?: User
  usersIdsBlacklist?: string[]
}

export const SelectUserFromListContent = ({
  hasCreatePermission,
  onCreateStart,
  onAddUserToTeam,
  hasUserCard,
  isLoading,
  avatarSubtitleType,
  isSelectingMultiples,
  onSelect,
  emptyStateTitle,
  hasMenu,
  teamLeader,
  usersIdsBlacklist,
}: SelectFromListContentProperties) => {
  const { items } = useContext(SearchableListContext)

  const hasMembers = items.length > 0

  return hasMembers || isLoading ? (
    <>
      {hasCreatePermission && (
        <SelectUserFromListOptions
          onCreateStart={onCreateStart}
          onAddUserToTeam={onAddUserToTeam}
        />
      )}

      <UsersInContext
        hasUserCard={hasUserCard}
        teamLeader={teamLeader}
        usersIdsBlacklist={usersIdsBlacklist}
        isLoading={isLoading}
        isSelectingMultiples={isSelectingMultiples}
        hasMenu={hasMenu}
        avatarSubtitleType={avatarSubtitleType}
        onSelect={onSelect}
      />
    </>
  ) : (
    <SelectUserFromListEmptyState
      title={emptyStateTitle}
      hasCreatePermission={hasCreatePermission}
      onCreateStart={onCreateStart}
      onAddMember={onAddUserToTeam}
    />
  )
}
