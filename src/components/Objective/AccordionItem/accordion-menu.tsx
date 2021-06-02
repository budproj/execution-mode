import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { MenuItem, MenuItemProps, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { keyResultInsertDrawerObjectiveID } from '../../../state/recoil/key-result/drawers/insert/objective-id'
import { teamAtomFamily } from '../../../state/recoil/team'
import TreeDotsIcon from '../../Icon/TreeDots'
import { GraphQLEffect } from '../../types'

import messages from './messages'

const stopAccordionOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
  event.stopPropagation()
}

const ObjectiveMenuOption = (properties: MenuItemProps) => (
  <MenuItem
    p={2}
    borderRadius={4}
    borderColor="transparent"
    color="gray.300"
    transition="all 0.2s ease-in-out"
    _hover={{
      bg: 'gray.50',
      color: 'gray.500',
    }}
    _focus={{
      bg: 'gray.50',
      color: 'gray.500',
    }}
    {...properties}
  />
)

interface ObjectiveAccordionMenuProperties {
  teamID?: string
  objectiveID?: string
  isLoaded?: boolean
}

export const ObjectiveAccordionMenu = ({
  teamID,
  objectiveID,
  isLoaded,
}: ObjectiveAccordionMenuProperties) => {
  const intl = useIntl()
  const team = useRecoilValue(teamAtomFamily(teamID))
  const setKeyResultInsertDrawerObjectiveID = useSetRecoilState(keyResultInsertDrawerObjectiveID)

  const canCreateKeyResult = team?.keyResults?.policy?.create === GraphQLEffect.ALLOW
  const hasAnyOptions = !isLoaded || canCreateKeyResult

  const openKeyResultInsertDrawer = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setKeyResultInsertDrawerObjectiveID(objectiveID)
    stopAccordionOpen(event)
  }

  return (
    <Skeleton isLoaded={isLoaded} display={hasAnyOptions ? 'inherit' : 'none'}>
      <Menu placement="bottom-end">
        <MenuButton
          bg="black.100"
          borderRadius={4}
          px={3}
          py={2}
          h="full"
          color="gray.500"
          _hover={{
            bg: 'brand.100',
            color: 'brand.500',
          }}
          _active={{
            bg: 'brand.100',
            color: 'brand.500',
          }}
          onClick={stopAccordionOpen}
        >
          <TreeDotsIcon
            desc={intl.formatMessage(messages.optionsButtonIconDesc)}
            fill="currentColor"
          />
        </MenuButton>
        <MenuList p={3} boxShadow="md" borderColor="new_gray.200" borderWidth={1}>
          {canCreateKeyResult && (
            <ObjectiveMenuOption onClick={openKeyResultInsertDrawer}>
              {intl.formatMessage(messages.firstMenuOption)}
            </ObjectiveMenuOption>
          )}
        </MenuList>
      </Menu>
    </Skeleton>
  )
}
