import React from 'react'
import { useIntl } from 'react-intl'

import {
  SearchableListOption,
  SearchableListOptionGroup,
} from 'src/components/Base/SearchableList/options'
import PlusIcon from 'src/components/Icon/Plus'

import { NamedAvatarSubtitleType } from '../../NamedAvatar/types'

import messages from './messages'
import { UsersInContext } from './users-in-context'

type SelectFromListContentProperties = {
  onCreateStart: () => void
  hasUserCard?: boolean
  isLoading?: boolean
  hasCreatePermission?: boolean
  avatarSubtitleType?: NamedAvatarSubtitleType
  onSelect?: (userID: string) => void | Promise<void>
}

export const SelectUserFromListContent = ({
  hasCreatePermission,
  onCreateStart,
  hasUserCard,
  isLoading,
  avatarSubtitleType,
  onSelect,
}: SelectFromListContentProperties) => {
  const intl = useIntl()

  return (
    <>
      {hasCreatePermission && (
        <SearchableListOptionGroup
          id="create-users"
          icon={
            <PlusIcon
              desc={intl.formatMessage(messages.createUserOptionGroupIconDesc)}
              fill="currentColor"
            />
          }
        >
          <SearchableListOption onClick={onCreateStart}>
            {intl.formatMessage(messages.newUserOption)}
          </SearchableListOption>
        </SearchableListOptionGroup>
      )}
      <UsersInContext
        hasUserCard={hasUserCard}
        isLoading={isLoading}
        avatarSubtitleType={avatarSubtitleType}
        onSelect={onSelect}
      />
    </>
  )
}
