import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React, { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'

import CyclesListBodyColumnBase from 'src/components/Cycle/List/Body/Columns/Base'
import { Check, ChevronDown } from 'src/components/Icon'
import { User } from 'src/components/User/types'
import buildPartialSelector from 'src/state/recoil/user/build-partial-selector'

import { USER_ROLES } from '../../../constants'
import { UsersTableListBodyColumnBaseProperties } from '../Base'

import messages from './messages'

export interface UsersTableListBodyColumnRoleProperties
  extends UsersTableListBodyColumnBaseProperties {
  id?: User['id']
  isActive?: boolean
  canEdit?: boolean
}

const userRoleSelector = buildPartialSelector<User['role']>('role')

const UsersTableListBodyColumnRole = ({
  id,
  isActive,
  canEdit = true,
}: UsersTableListBodyColumnRoleProperties): ReactElement => {
  // Const userRole = useRecoilValue(userRoleSelector(id))
  const intl = useIntl()

  const [userRole, setUserRole] = useState<USER_ROLES>(USER_ROLES.DEFAULT)

  const isRoleLoaded = Boolean(userRole)

  const titleRolesLabels = new Map([
    [USER_ROLES.DEFAULT, intl.formatMessage(messages.userDefaultRoleTitle)],
    [USER_ROLES.EDITION, intl.formatMessage(messages.userEditionRoleTitle)],
    [USER_ROLES.ADMIN, intl.formatMessage(messages.userAdminUserRoleTitle)],
  ])

  const descriptionRolesLabels = new Map([
    [USER_ROLES.DEFAULT, intl.formatMessage(messages.userDefaultRoleDescription)],
    [USER_ROLES.EDITION, intl.formatMessage(messages.userEditionRoleDescription)],

    [USER_ROLES.ADMIN, intl.formatMessage(messages.userAdminRoleDescription)],
  ])

  const handleSelectUserRole = (userRole: USER_ROLES) => {
    setUserRole(userRole)
  }

  return (
    <CyclesListBodyColumnBase
      borderStyle="solid"
      pr={2}
      h="full"
      alignItems="center"
      display="flex"
      minWidth="280px"
    >
      <Flex alignItems="center">
        <Menu placement="bottom-end">
          {({ isOpen }) => (
            <>
              <MenuButton
                as={Button}
                disabled={!isActive || !canEdit}
                borderWidth={1}
                cursor={isActive || canEdit ? 'pointer' : 'default'}
                borderColor="new-gray.500"
                color="new-gray.800"
                borderRadius={4}
                px="0.65rem"
                py="0.35rem"
                h="auto"
                fontSize="sm"
                width={110}
                iconSpacing={12}
                rightIcon={
                  <ChevronDown
                    desc="menu"
                    ml={5}
                    fontSize="xs"
                    fill="current"
                    stroke="current"
                    transition="0.2s transform ease-in"
                    transform={isOpen ? 'rotate(180deg)' : 'none'}
                  />
                }
                _hover={{
                  color: 'new-gray.600',
                  borderColor: 'new-gray.400',
                }}
              >
                {userRole && titleRolesLabels.get(userRole)}
              </MenuButton>
              <MenuList
                boxShadow="lg"
                borderColor="new-gray.300"
                borderWidth={1}
                p={1}
                overflow="hidden"
                zIndex={999}
                minWidth="auto"
              >
                {[...titleRolesLabels].map(([labelEnum]) => (
                  <MenuItem
                    key={labelEnum}
                    p="0.35rem 3rem 0.35rem 0.75rem"
                    color="new-gray.800"
                    h="auto"
                    fontSize="sm"
                    fontWeight={500}
                    transition="0.2s background-color, 0.2s color"
                    onClick={() => handleSelectUserRole(labelEnum)}
                  >
                    <Box>
                      <Flex gap={2}>
                        <Text fontSize={12} color="current" fontWeight={700}>
                          {titleRolesLabels.get(labelEnum)}
                        </Text>
                        {userRole === labelEnum && (
                          <Check desc="menu" fontSize="large" stroke="current" fill="current" />
                        )}
                      </Flex>
                      <Text fontSize={12} fontWeight={400} color="new-gray.700" maxW="md" mt={1}>
                        {descriptionRolesLabels.get(labelEnum)}
                      </Text>
                    </Box>
                  </MenuItem>
                ))}
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
    </CyclesListBodyColumnBase>
  )
}

export default UsersTableListBodyColumnRole
