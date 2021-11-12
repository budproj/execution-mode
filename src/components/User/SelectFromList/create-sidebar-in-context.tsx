import { useLazyQuery } from '@apollo/client'
import React, { useContext } from 'react'

import { SearchableListContext } from 'src/components/Base/SearchableList/context'

import { CreateUserSidebar } from '../Create/Sidebar'

import queries from './queries.gql'

type SidebarInContextProperties = {
  isOpen: boolean
  teamID?: string
  onClose: () => void
  onSelect?: (userID: string) => void | Promise<void>
}

type GetUserResponse = {
  user: {
    id: string
    firstName: string
    nickname: string
    fullName: string
    role: string
    picture: string
    about: string
    linkedInProfileAddress: string
  }
}

export const CreateSidebarInContext = ({
  teamID,
  isOpen,
  onClose,
  onSelect,
}: SidebarInContextProperties) => {
  const { handleNewItem } = useContext(SearchableListContext)
  const [getUserData] = useLazyQuery<GetUserResponse>(queries.GET_USER_DATA, {
    onCompleted: (data) => {
      handleNewItem(data.user)
      if (onSelect) void onSelect(data.user.id)
    },
  })

  const handleCreatedUser = (userID: string) => {
    getUserData({ variables: { id: userID } })
  }

  return (
    <CreateUserSidebar
      teamID={teamID}
      isOpen={isOpen}
      onClose={onClose}
      onCreate={handleCreatedUser}
    />
  )
}
