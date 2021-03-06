import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { objectiveAtomFamily } from '../../../../state/recoil/objective'
import { teamAtomFamily } from '../../../../state/recoil/team'
import TreeDotsIcon from '../../../Icon/TreeDots'
import { GraphQLEffect } from '../../../types'
import { stopAccordionOpen } from '../handlers'

import messages from './messages'
import { CreateKeyResultOption } from './option-create-key-result'
import { DeleteObjectiveOption } from './option-delete-objective'
import { UpdateObjectiveOption } from './option-update-objective'

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
  const objective = useRecoilValue(objectiveAtomFamily(objectiveID))

  const canCreateKeyResult = team?.keyResults?.policy?.create === GraphQLEffect.ALLOW
  const canUpdateObjective = objective?.policy?.update === GraphQLEffect.ALLOW
  const canDeleteObjective = objective?.policy?.delete === GraphQLEffect.ALLOW
  const hasAnyOptions = !isLoaded || canCreateKeyResult || canUpdateObjective || canDeleteObjective

  return (
    <Skeleton isLoaded={isLoaded} display={hasAnyOptions ? 'inherit' : 'none'}>
      <Menu placement="bottom-end" variant="action-list">
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
        <MenuList>
          {canCreateKeyResult && <CreateKeyResultOption objectiveID={objectiveID} />}
          {canUpdateObjective && <UpdateObjectiveOption objectiveID={objectiveID} />}
          {canDeleteObjective && (
            <DeleteObjectiveOption objectiveID={objectiveID} teamID={teamID} />
          )}
        </MenuList>
      </Menu>
    </Skeleton>
  )
}
