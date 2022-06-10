import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { SearchBar } from 'src/components/Base/SearchBar/wrapper'
import UsersTableList from 'src/components/User/TableList'
import { USERS_TABLE_COLUMN } from 'src/components/User/TableList/Body/Columns/constants'
import { useGetUsers } from 'src/components/User/hooks/getUsers'
import { UserStatus } from 'src/components/User/types'

import messages from './messages'

const SettingsUsers = () => {
  const intl = useIntl()
  const { data: users, loading } = useGetUsers()

  const [usersFilter, setUsersFilter] = useState('')
  const filteredUsers = users.filter((user) =>
    user.fullName.toLocaleLowerCase().includes(usersFilter.toLocaleLowerCase()),
  )
  const usersInfos = useMemo(
    () => filteredUsers.map(({ id, status }) => ({ id, isActive: status === UserStatus.ACTIVE })),
    [filteredUsers],
  )

  const columns = [
    USERS_TABLE_COLUMN.NAME,
    USERS_TABLE_COLUMN.TEAMS,
    USERS_TABLE_COLUMN.ROLES,
    USERS_TABLE_COLUMN.STATE,
    USERS_TABLE_COLUMN.ACTIONS,
  ]

  return (
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
          <Button
            bg="brand.500"
            color="black.50"
            _hover={{ background: 'brand.400', color: 'black.50' }}
          >
            {intl.formatMessage(messages.createUserButton)}
          </Button>
        </Stack>
      </Heading>
      <UsersTableList isLoading={loading} usersInfo={usersInfos} pt={10} columns={columns} />
    </Flex>
  )
}

export default SettingsUsers
