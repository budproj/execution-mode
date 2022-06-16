import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import { SearchBar } from 'src/components/Base/SearchBar/wrapper'
import { CreateUserSidebar } from 'src/components/User/Create/Sidebar'
import UsersTableList from 'src/components/User/TableList'
import { SeeDetailsAction } from 'src/components/User/TableList/Body/Columns/Actions/see-details-action'
import { USERS_TABLE_COLUMN } from 'src/components/User/TableList/Body/Columns/constants'
import { useGetUsers } from 'src/components/User/hooks/getUsers'
import { GraphQLEffect } from 'src/components/types'
import meAtom from 'src/state/recoil/user/me'
import { seeDetailsUserSidebarViewMode } from 'src/state/recoil/user/see-deatils-user-sidebar-view-mode'

import { CompanyMenuProperties } from '../SidebarMenu/Section/Company/company'

import messages from './messages'

const SettingsUsers = ({ permissions }: CompanyMenuProperties) => {
  const intl = useIntl()
  const { data: users, loading, refetch } = useGetUsers()
  const [isCreateSidebarOpen, setIsCreateSidebarOpen] = useState(false)
  const [{ userId, isOpened }, setIsOpened] = useRecoilState(seeDetailsUserSidebarViewMode)

  const myID = useRecoilValue(meAtom)

  const closeUserDetailsSidebar = () => setIsOpened({ userId: '', isOpened: false })

  const user = users.find((user) => user.id === myID)
  const companyId = user?.companies?.edges[0]?.node.id

  const [usersFilter, setUsersFilter] = useState('')
  const filteredUsers = users.filter((user) =>
    user.fullName.toLocaleLowerCase().includes(usersFilter.toLocaleLowerCase()),
  )
  const usersIds = useMemo(() => filteredUsers.map(({ id }) => id), [filteredUsers])

  const onChanges = async () => refetch()

  const handleCreateSidebarOpen = () => {
    if (!isCreateSidebarOpen) setIsCreateSidebarOpen(true)
  }

  const handleCreateSidebarClose = () => {
    if (isCreateSidebarOpen) setIsCreateSidebarOpen(false)
  }

  const columns = [
    USERS_TABLE_COLUMN.NAME,
    USERS_TABLE_COLUMN.TEAMS,
    USERS_TABLE_COLUMN.ROLES,
    USERS_TABLE_COLUMN.STATE,
    USERS_TABLE_COLUMN.ACTIONS,
  ]

  return (
    <>
      <Flex flexDir="column" width="100%">
        <Heading display="flex" alignItems="center" justifyContent="space-between">
          <Box flexDir="column">
            <Text fontSize={24} fontWeight={400} color="#121415" lineHeight="30px" mb={3}>
              {intl.formatMessage(messages.subTitle)}
            </Text>
            <Text fontSize={14} fontWeight={400} color="new-gray.700" lineHeight="17px">
              {intl.formatMessage(messages.pageDescription, {
                breakingline: <br />,
              })}
            </Text>
          </Box>
          <Stack direction="row" gap={2}>
            <Box w="15rem">
              <SearchBar
                placeholder={intl.formatMessage(messages.searchUserInput)}
                onSearch={setUsersFilter}
              />
            </Box>
            {permissions.user.create === GraphQLEffect.ALLOW && (
              <Button
                bg="brand.500"
                color="black.50"
                _hover={{ background: 'brand.400', color: 'black.50' }}
                onClick={handleCreateSidebarOpen}
              >
                {intl.formatMessage(messages.createUserButton)}
              </Button>
            )}
          </Stack>
        </Heading>
        <UsersTableList
          canEdit={permissions.user.create === GraphQLEffect.ALLOW}
          isLoading={loading}
          usersIds={usersIds}
          pt={10}
          columns={columns}
        />
      </Flex>
      <CreateUserSidebar
        teamID={companyId}
        isOpen={isCreateSidebarOpen}
        onClose={handleCreateSidebarClose}
        onCreate={onChanges}
      />
      <SeeDetailsAction
        isOpen={isOpened}
        id={userId}
        onClose={closeUserDetailsSidebar}
        onUserDeactivation={onChanges}
      />
    </>
  )
}

export default SettingsUsers
