import { Stack, Text, Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { Scrollbars } from 'rc-scrollbars'
import React, { ReactElement, useRef } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { IntlLink } from 'src/components/Base'
import TreeDotsIcon from 'src/components/Icon/TreeDots'
import { NamedAvatar } from 'src/components/User'
import meAtom from 'src/state/recoil/user/me'

import { NamedAvatarSubtitleType } from '../NamedAvatar/types'
import { User } from '../types'

import messages from './messages'
import { SelectMultiplesUsers } from './select-multiples'
import { UserListSkeleton } from './skeleton'

export interface UserListProperties {
  users: User[]
  onUserClick?: (userID: string) => void | Promise<void>
  avatarSubtitleType?: NamedAvatarSubtitleType
  isLoading?: boolean
  showUserCard?: boolean
  selectMultiples?: boolean
  emptyState?: ReactElement
  hasMenu?: boolean
}

export const UserList = ({
  users,
  onUserClick,
  avatarSubtitleType,
  showUserCard,
  isLoading,
  selectMultiples,
  emptyState,
  hasMenu = false,
}: UserListProperties) => {
  const cardReference = useRef<HTMLDivElement>(null)
  const intl = useIntl()
  const myID = useRecoilValue(meAtom)

  const handleUserClick = (userID: string) => async () => {
    if (onUserClick) await onUserClick(userID)
  }

  emptyState ??= <Text color="black.600">{intl.formatMessage(messages.emptyState)}</Text>

  return (
    <>
      <Box ref={cardReference} />
      <Scrollbars autoHeight>
        <Stack spacing={4}>
          {isLoading ? (
            <UserListSkeleton />
          ) : selectMultiples ? (
            onUserClick && (
              <SelectMultiplesUsers
                users={users}
                avatarSubtitleType={avatarSubtitleType}
                onSelectUser={onUserClick}
              />
            )
          ) : users.length > 0 ? (
            hasMenu ? (
              users.map((user) => (
                <NamedAvatar
                  key={user.id}
                  redirectToProfile
                  showCard={showUserCard}
                  canHover={Boolean(onUserClick)}
                  userID={user.id}
                  subtitleType={avatarSubtitleType}
                  cardPortalReference={cardReference}
                >
                  <Menu isLazy placement="start" variant="action-list">
                    <MenuButton
                      color="new-gray.600"
                      _hover={{
                        color: 'new-gray.900',
                      }}
                      mr={2}
                    >
                      <TreeDotsIcon
                        fill="currentColor"
                        fontSize="2xl"
                        style={{ transform: 'rotate(90deg)' }}
                        desc={intl.formatMessage(messages.optionsButtonDesc)}
                      />
                    </MenuButton>
                    <MenuList>
                      <IntlLink href={user?.id === myID ? '/my-things' : `/profile/${user?.id}`}>
                        <MenuItem>{intl.formatMessage(messages.firstMenuItemOption)}</MenuItem>
                      </IntlLink>
                      <MenuItem onClick={handleUserClick(user.id)}>
                        {intl.formatMessage(messages.secondMenuItemOption)}
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </NamedAvatar>
              ))
            ) : (
              users.map((user) => (
                <NamedAvatar
                  key={user.id}
                  showCard={showUserCard}
                  canHover={Boolean(onUserClick)}
                  userID={user.id}
                  subtitleType={avatarSubtitleType}
                  cardPortalReference={cardReference}
                  onClick={handleUserClick(user.id)}
                />
              ))
            )
          ) : (
            emptyState
          )}
        </Stack>
      </Scrollbars>
    </>
  )
}
