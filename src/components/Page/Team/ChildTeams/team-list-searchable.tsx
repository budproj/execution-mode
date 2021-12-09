import React, { useContext, useState } from 'react'
import { useIntl } from 'react-intl'

import { SearchableList } from 'src/components/Base/SearchableList'
import { SearchableListContext } from 'src/components/Base/SearchableList/context'
import {
  SearchableListOption,
  SearchableListOptionGroup,
} from 'src/components/Base/SearchableList/options'
import PlusIcon from 'src/components/Icon/Plus'
import { TeamList } from 'src/components/Team/List/wrapper'
import SaveTeamModal from 'src/components/Team/SaveTeamModal'
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const intl = useIntl()

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <SearchableList
      placeholder={intl.formatMessage(messages.searchPlaceholder)}
      searchKey="name"
      initialItems={teams}
    >
      <SearchableListOptionGroup
        id="create-users"
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
      <SaveTeamModal isOpen={isModalOpen} onClose={closeModal} />
      <TeamsInContext isLoading={isLoading} />
    </SearchableList>
  )
}
