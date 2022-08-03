import { useLazyQuery, useMutation } from '@apollo/client'
import {
  Stack,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import EditTeamButton from 'src/components/Base/EditTeamButton'
import { Cycle } from 'src/components/Cycle/types'
import HistoryIcon from 'src/components/Icon/History'
import RedoIcon from 'src/components/Icon/Redo'
import SaveTeamModal from 'src/components/Team/SaveTeamModal'
import { Team } from 'src/components/Team/types'
import {
  Delta,
  GraphQLConnection,
  GraphQLConnectionPolicy,
  GraphQLEffect,
  GraphQLEntityPolicy,
  Status,
} from 'src/components/types'
import useCadence from 'src/state/hooks/useCadence'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { isReloadNecessary } from 'src/state/recoil/objective'
import { ObjectiveMode, setObjectiveToMode } from 'src/state/recoil/objective/context'
import { isEditTeamModalOpenAtom } from 'src/state/recoil/team'
import {
  ObjectivesViewMode,
  teamObjectivesViewMode,
} from 'src/state/recoil/team/objectives-view-mode'
import meAtom from 'src/state/recoil/user/me'

import queries from '../queries.gql'

import messages from './messages'

interface MenuHeaderProperties {
  teamId: string
  team?: Team
}

type GetCyclesQueryResult = {
  cycles: GraphQLConnection<Cycle>
  inactiveCycles: GraphQLConnection<Cycle>
  team: Team
}

type CreateDraftObjectiveQueryResult = {
  createObjective: {
    id: string
    title: string
    cycle: Cycle
    status: Status
    delta: Delta
    policy: GraphQLEntityPolicy
  }
}

export const MenuHeader = ({ teamId, team }: MenuHeaderProperties) => {
  const intl = useIntl()
  const toast = useToast()
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useRecoilState(isEditTeamModalOpenAtom)

  const [hasInactiveObjectives, setHasInactiveObjectives] = useState<boolean>()
  const [objectivesPolicy, setObjectivesPolicy] = useState<GraphQLConnectionPolicy>()
  const [getObjectivesViewMode, setObjectivesViewMode] = useRecoilState(
    teamObjectivesViewMode(teamId),
  )
  const setObjectiveIDToEditMode = useSetRecoilState(setObjectiveToMode(ObjectiveMode.EDIT))
  const ownerID = useRecoilValue(meAtom)
  const setIsReloadNecessary = useSetRecoilState(isReloadNecessary)

  const [activeCycles, setActiveCycleEdges] = useConnectionEdges<Cycle>()

  const [fetchCycles] = useLazyQuery<GetCyclesQueryResult>(queries.GET_CYCLES, {
    fetchPolicy: 'no-cache',
    onError: (error) => console.error(error),
    onCompleted: ({ cycles, inactiveCycles, team }) => {
      setActiveCycleEdges(cycles.edges)
      setObjectivesPolicy(team?.objectives?.policy)
      setHasInactiveObjectives(inactiveCycles.edges.length > 0)
    },
  })

  useEffect(() => {
    void fetchCycles()
  }, [fetchCycles])

  const [createDraftObjective] = useMutation<CreateDraftObjectiveQueryResult>(
    queries.CREATE_DRAFT_OBJECTIVE,
    {
      variables: {
        title: intl.formatMessage(messages.draftObjectiveTitle),
        ownerID,
        teamID: teamId,
      },
      onCompleted: async (data) => {
        setObjectiveIDToEditMode(data.createObjective.id)
        setIsReloadNecessary(true)
      },
      onError: () => {
        toast({
          title: intl.formatMessage(messages.draftObjectiveErrorToastMessage),
          status: 'error',
        })
      },
    },
  )

  const onCreateOKR = (cycleID?: string) => {
    void createDraftObjective({
      variables: {
        cycleID,
      },
    })
  }

  const handleViewOldCycles = () => {
    if (getObjectivesViewMode === ObjectivesViewMode.ACTIVE)
      setObjectivesViewMode(ObjectivesViewMode.NOT_ACTIVE)
    else setObjectivesViewMode(ObjectivesViewMode.ACTIVE)
  }

  const isViewingActiveObjectives = getObjectivesViewMode === ObjectivesViewMode.ACTIVE

  const isAllowedToCreateObjectives = objectivesPolicy?.create === GraphQLEffect.ALLOW

  return (
    <>
      {isEditTeamModalOpen && team && (
        <SaveTeamModal isOpen isEditing onClose={() => setIsEditTeamModalOpen(false)} />
      )}
      <Stack direction="row" justifyContent="flex-end" marginTop="0.8em">
        {/* // eslint-disable-next-line no-warning-comments
      // TODO: Implement this options menu (Victor Perin)

      {false && isAllowedToCreateObjectives && isViewingActiveObjectives && (
        <Tooltip label="Editar time" placement="top">
          <Button
            bg="new-gray.300"
            _hover={{ background: 'new-gray.400', color: 'new-gray.800' }}
            color="new-gray.800"
          >
            <GearIcon w="1.3em" h="1.3em" desc="teste" fill="currentColor" />
          </Button>
        </Tooltip>
      )} */}

        <EditTeamButton onClick={() => setIsEditTeamModalOpen(true)} />

        {hasInactiveObjectives && isViewingActiveObjectives && (
          <Tooltip label={intl.formatMessage(messages.explorePreviousCyclesOption)} placement="top">
            <Button
              bg="new-gray.300"
              _hover={{ background: 'new-gray.400', color: 'new-gray.800' }}
              color="new-gray.800"
              leftIcon={<HistoryIcon w="1.3em" h="1.3em" desc="teste" fill="currentColor" />}
              onClick={handleViewOldCycles}
            >
              {intl.formatMessage(messages.history)}
            </Button>
          </Tooltip>
        )}

        {hasInactiveObjectives && !isViewingActiveObjectives && (
          <Button
            bg="new-gray.300"
            _hover={{ background: 'new-gray.400', color: 'new-gray.800' }}
            color="new-gray.800"
            leftIcon={<RedoIcon w="1.3em" h="1.3em" desc="teste" fill="currentColor" />}
            onClick={handleViewOldCycles}
          >
            {intl.formatMessage(messages.backToPresent)}
          </Button>
        )}

        {isAllowedToCreateObjectives && isViewingActiveObjectives && (
          <Menu placement="bottom-end" variant="action-list">
            <MenuButton
              as={Button}
              bg="brand.500"
              color="black.50"
              _hover={{ background: 'brand.400', color: 'black.50' }}
            >
              {intl.formatMessage(messages.createItem)}
            </MenuButton>
            <MenuList>
              {activeCycles.reverse().map((cycle) => (
                <AddOKROnRelatedCycleOption
                  key={cycle.id}
                  cycle={cycle}
                  isEnabled={isAllowedToCreateObjectives}
                  onCreateOKR={onCreateOKR}
                />
              ))}
            </MenuList>
          </Menu>
        )}
      </Stack>
    </>
  )
}

type AddOKROnRelatedCycleOptionProperties = {
  cycle: Cycle
  isEnabled: boolean
  onCreateOKR: (cycleID?: string) => void
}

const AddOKROnRelatedCycleOption = ({
  cycle,
  onCreateOKR,
  isEnabled,
}: AddOKROnRelatedCycleOptionProperties) => {
  const intl = useIntl()
  const [cadence] = useCadence(cycle.cadence)

  return (
    <MenuItem disabled={!isEnabled} onClick={() => isEnabled && onCreateOKR(cycle.id)}>
      {intl
        .formatMessage(messages.createOKRInRelatedCycleOption, {
          cadence: cadence.prefix,
          cycle: cycle.period,
          parent: cycle.parent?.period,
        })
        .trim()}
    </MenuItem>
  )
}
