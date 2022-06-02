import { Menu, MenuButton, MenuList, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import TreeDotsIcon from 'src/components/Icon/TreeDots'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'

import { objectiveAtomFamily } from '../../../../state/recoil/objective'
import { teamAtomFamily } from '../../../../state/recoil/team'
import { GraphQLEffect } from '../../../types'
import { stopAccordionOpen } from '../handlers'

import messages from './messages'
import { CreateKeyResultOption } from './option-create-key-result'
import { DeleteObjectiveOption } from './option-delete-objective'
import { UpdateObjectiveOption } from './option-update-objective'

interface ObjectiveAccordionMenuProperties {
  teamID?: Team['id']
  userID?: User['id']
  objectiveID?: string
  isLoaded?: boolean
}

export const ObjectiveAccordionMenu = ({
  teamID,
  userID,
  objectiveID,
  isLoaded,
}: ObjectiveAccordionMenuProperties) => {
  const intl = useIntl()
  const team = useRecoilValue(teamAtomFamily(teamID))
  const objective = useRecoilValue(objectiveAtomFamily(objectiveID))

  const policyHolder = userID ? objective : team
  const canCreateKeyResult = policyHolder?.keyResults?.policy?.create === GraphQLEffect.ALLOW
  const canUpdateObjective = objective?.policy?.update === GraphQLEffect.ALLOW
  const canDeleteObjective = objective?.policy?.delete === GraphQLEffect.ALLOW
  const hasAnyOptions = !isLoaded || canCreateKeyResult || canUpdateObjective || canDeleteObjective

  return (
    <Skeleton isLoaded={isLoaded} display={hasAnyOptions ? 'inherit' : 'none'}>
      <Menu placement="bottom-end" variant="action-list">
        <MenuButton
          bg="black.100"
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
          onClick={stopAccordionOpen}
        >
          <TreeDotsIcon
            desc={intl.formatMessage(messages.optionsButtonIconDesc)}
            fill="currentColor"
            fontSize="2xl"
          />
        </MenuButton>
        <MenuList>
          {canCreateKeyResult && <CreateKeyResultOption objectiveID={objectiveID} />}
          {canUpdateObjective && <UpdateObjectiveOption objectiveID={objectiveID} />}
          {canDeleteObjective && (
            <DeleteObjectiveOption objectiveID={objectiveID} userID={userID} teamID={teamID} />
          )}
        </MenuList>
      </Menu>
    </Skeleton>
  )
}
