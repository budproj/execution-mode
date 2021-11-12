import React from 'react'
import { useIntl } from 'react-intl'

import {
  SearchableListOption,
  SearchableListOptionGroup,
} from 'src/components/Base/SearchableList/options'
import PlusIcon from 'src/components/Icon/Plus'

import messages from './messages'

type SelectUserFromListOptionsProperties = {
  onCreateStart: () => void
}

export const SelectUserFromListOptions = ({
  onCreateStart,
}: SelectUserFromListOptionsProperties) => {
  const intl = useIntl()
  return (
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
  )
}
