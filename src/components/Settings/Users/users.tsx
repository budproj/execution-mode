import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { SearchBar } from 'src/components/Base/SearchBar/wrapper'
import UsersTableList from 'src/components/User/ListTable'
import { USERS_TABLE_COLUMN } from 'src/components/User/ListTable/Body/Columns/constants'

import messages from './messages'

const SettingsUsers = () => {
  const intl = useIntl()

  // TODO: mocked user id
  const userIds = ['9ce87eda-64d1-4bfb-80a5-aa7811a04ea9', '9ce87eda-64d1-4bfb-80a5-aa7811a04ea9']

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
            <SearchBar placeholder={intl.formatMessage(messages.searchUserInput)} />
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
      <UsersTableList pt={10} usersIDs={userIds} isLoading={false} columns={columns} />
    </Flex>
  )
}

export default SettingsUsers
