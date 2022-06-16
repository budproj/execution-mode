import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
  useToast,
} from '@chakra-ui/react'
import React, { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import CyclesListBodyColumnBase from 'src/components/Cycle/List/Body/Columns/Base'
import { Check, ChevronDown } from 'src/components/Icon'
import { useChangeUserRole } from 'src/components/User/hooks/changeUserRole'
import { AuthzUserRoles, User } from 'src/components/User/types'
import buildPartialSelector from 'src/state/recoil/user/build-partial-selector'

import { UsersTableListBodyColumnBaseProperties } from '../Base'

import messages from './messages'

export interface UsersTableListBodyColumnRoleProperties
  extends UsersTableListBodyColumnBaseProperties {
  id?: User['id']
  isActive?: boolean
  canEdit?: boolean
}

const userAuthzRoleSelector = buildPartialSelector<User['authzRole']>('authzRole')

const UsersTableListBodyColumnRole = ({
  id,
  isActive,
  canEdit = true,
}: UsersTableListBodyColumnRoleProperties): ReactElement => {
  const userAuthzRole = useRecoilValue(userAuthzRoleSelector(id))
  const { updateUserRole, data, loading, error } = useChangeUserRole()

  const toast = useToast()

  const intl = useIntl()

  const [selectedUserRole, setSelectedUserRole] = useState(userAuthzRole?.name)
  const handleChangeUserRole = async (selectedUserRole: string) => {
    await updateUserRole({
      variables: {
        id,
        newrole: selectedUserRole,
      },
    })
  }

  const isAuthzUserRoleLoading = Boolean(userAuthzRole)

  useEffect(() => {
    if (isAuthzUserRoleLoading) setSelectedUserRole(userAuthzRole?.name)
  }, [isAuthzUserRoleLoading, userAuthzRole?.name])

  const titleRolesLabels = new Map([
    [AuthzUserRoles.teamMember, intl.formatMessage(messages.userDefaultRoleTitle)],
    [AuthzUserRoles.leader, intl.formatMessage(messages.userLeaderRoleTitle)],
    [AuthzUserRoles.squadMember, intl.formatMessage(messages.userOkrMasterRoleTitle)],
    [AuthzUserRoles.admin, intl.formatMessage(messages.userAdminUserRoleTitle)],
  ])

  const descriptionRolesLabels = new Map([
    [AuthzUserRoles.teamMember, intl.formatMessage(messages.userDefaultRoleDescription)],
    [AuthzUserRoles.leader, intl.formatMessage(messages.userLeaderRoleDescription)],
    [AuthzUserRoles.squadMember, intl.formatMessage(messages.userOkrMasteRoleDescription)],
    [AuthzUserRoles.admin, intl.formatMessage(messages.userAdminRoleDescription)],
  ])

  const handleSelectUserRole = (role: string) => {
    setSelectedUserRole(role)
    handleChangeUserRole(role)
  }

  useEffect(() => {
    if (!loading) {
      if (error) {
        toast({
          title: intl.formatMessage(messages.unknownErrorToastMessage),
          status: 'error',
        })
      } else if (data) {
        toast({
          status: 'success',
          title: intl.formatMessage(messages.successUpdateUserRoleToastMessage, {
            user: data.updateUserRole.fullName,
          }),
        })
      }
    }
  }, [loading, error, data, toast, intl])

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
        <Skeleton
          isLoaded={isAuthzUserRoleLoading}
          {...buildSkeletonMinSize(isAuthzUserRoleLoading, 140, 28)}
        >
          <Menu placement="bottom-end">
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  disabled={!isActive || !canEdit}
                  borderWidth={1}
                  cursor={isActive && canEdit ? 'pointer' : 'default'}
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
                  _hover={
                    isActive && canEdit
                      ? {
                          color: 'new-gray.600',
                          borderColor: 'new-gray.400',
                        }
                      : undefined
                  }
                >
                  {selectedUserRole && titleRolesLabels.get(selectedUserRole)}
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
                      onClick={async () => handleSelectUserRole(labelEnum)}
                    >
                      <Box>
                        <Flex gap={2}>
                          <Text fontSize={12} color="current" fontWeight={700}>
                            {titleRolesLabels.get(labelEnum)}
                          </Text>
                          {selectedUserRole === labelEnum && (
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
        </Skeleton>
      </Flex>
    </CyclesListBodyColumnBase>
  )
}

export default UsersTableListBodyColumnRole
