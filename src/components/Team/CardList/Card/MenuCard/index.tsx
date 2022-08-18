import { Box, Flex, Menu, MenuButton, MenuItem, MenuList, StyleProps } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import TreeDotsIcon from 'src/components/Icon/TreeDots'
import { Team } from 'src/components/Team/types'
import { isEditTeamModalOpenAtom } from 'src/state/recoil/team'

import messages from './messages'

interface MenuCardProperties extends StyleProps {
  teamId?: Team['id']
  openModal?: () => void
}

export const MenuCard = ({ openModal, teamId, ...rest }: MenuCardProperties) => {
  const setIsEditTeamModalOpen = useSetRecoilState(isEditTeamModalOpenAtom)
  const intl = useIntl()

  const onEditClick = () => {
    if (openModal) openModal()
    setIsEditTeamModalOpen(teamId)
  }

  return (
    <Flex width="100%" justifyContent="flex-end" {...rest}>
      <Box>
        <Menu variant="action-list">
          <MenuButton
            borderRadius={4}
            color="gray.500"
            p={2}
            _hover={{
              bg: 'brand.100',
              color: 'brand.500',
            }}
            _active={{
              bg: 'brand.100',
              color: 'brand.500',
            }}
          >
            <TreeDotsIcon desc="aaaa" fill="currentColor" fontSize="2xl" />
          </MenuButton>
          <Box>
            <MenuList>
              <MenuItem onClick={onEditClick}>
                {intl.formatMessage(messages.teamEditButton)}
              </MenuItem>
            </MenuList>
          </Box>
        </Menu>
      </Box>
    </Flex>
  )
}
