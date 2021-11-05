import React, { useContext } from 'react'
import { useIntl } from 'react-intl'

import { SearchableList } from 'src/components/Base/SearchableList'
import { SearchableListContext } from 'src/components/Base/SearchableList/context'
import { TeamList } from 'src/components/Team/List/wrapper'
import { Team } from 'src/components/Team/types'

import messages from './messages'

interface TeamListSearchableProperties {
  teams: Team[]
  isLoading: boolean
}

interface TeamsInContextProperties {
  isLoading: boolean
}

const TeamsInContext = ({ isLoading }: TeamsInContextProperties) => {
  const { items } = useContext(SearchableListContext)

  return <TeamList teams={items} isLoading={isLoading} />
}

export const TeamListSearchable = ({ teams, isLoading }: TeamListSearchableProperties) => {
  const intl = useIntl()

  return (
    <SearchableList
      placeholder={intl.formatMessage(messages.searchPlaceholder)}
      searchKey="name"
      initialItems={teams}
    >
      <TeamsInContext isLoading={isLoading} />
    </SearchableList>
  )
}
