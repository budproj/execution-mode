import React, { useContext } from 'react'
import { useIntl } from 'react-intl'

import { SearchableList } from 'src/components/Base/SearchableList'
import { SearchableListContext } from 'src/components/Base/SearchableList/context'
import {
  SearchableListOption,
  SearchableListOptionGroup,
} from 'src/components/Base/SearchableList/options'
import PlusIcon from 'src/components/Icon/Plus'
import { TeamList } from 'src/components/Team/List/wrapper'
import { Team } from 'src/components/Team/types'

import messages from './messages'

interface TeamListSearchableProperties {
  hasPermission: boolean
  teams: Team[]
  isLoading: boolean
  openModal: () => void
}

interface TeamsInContextProperties {
  isLoading: boolean
}

const TeamsInContext = ({ isLoading }: TeamsInContextProperties) => {
  const { items } = useContext(SearchableListContext)

  return <TeamList teams={items} isLoading={isLoading} />
}

export const TeamListSearchable = ({
  teams,
  isLoading,
  openModal,
  hasPermission,
}: TeamListSearchableProperties) => {
  const intl = useIntl()

  return (
    <SearchableList
      placeholder={intl.formatMessage(messages.searchPlaceholder)}
      searchKey="name"
      initialItems={teams}
      isLoading={isLoading}
    >
      {hasPermission && (
        <SearchableListOptionGroup
          id="create-subteams"
          icon={
            <PlusIcon
              desc={intl.formatMessage(messages.createSubteamOptionGroupIconDesc)}
              fill="currentColor"
            />
          }
        >
          <SearchableListOption onClick={openModal}>
            {intl.formatMessage(messages.newSubeamOption)}
          </SearchableListOption>
        </SearchableListOptionGroup>
      )}
      <TeamsInContext isLoading={isLoading} />
    </SearchableList>
  )
}
