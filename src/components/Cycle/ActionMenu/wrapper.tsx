import { useLazyQuery } from '@apollo/client'
import { Menu, MenuButton, MenuList } from '@chakra-ui/react'
import React, { ReactNode, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { Cycle } from 'src/components/Cycle/types'
import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'

import TreeDotsIcon from '../../Icon/TreeDots'

import { Actions } from './actions'
import messages from './messages'
import queries from './queries.gql'
import { ActionSpinner } from './spinner'

export type Action = () => void

interface ActionMenuProperties {
  cycleID?: string
  onViewOldCycles?: Action
  onCreateOKR?: Action
  children?: ReactNode
}

type GetActiveCyclesQueryResult = {
  cycles: GraphQLConnection<Cycle>
}

export const ActionMenu = ({
  cycleID,
  onViewOldCycles,
  onCreateOKR,
  children,
}: ActionMenuProperties) => {
  const intl = useIntl()
  const [isOpen, setIsOpen] = useState(false)
  const [relatedCycles, setRelatedCycles] = useState<Cycle[]>()
  const [activeCycles, setActiveCycleEdges, _, isConnectionLoaded] = useConnectionEdges<Cycle>()

  const [fetchActiveCycles, { called, loading }] = useLazyQuery<GetActiveCyclesQueryResult>(
    queries.GET_ACTIVE_CYCLES,
    {
      fetchPolicy: 'cache-and-network',
      onCompleted: ({ cycles }) => setActiveCycleEdges(cycles.edges),
    },
  )

  const handleOpenMenu = () => setIsOpen(true)
  const handleCloseMenu = () => setIsOpen(false)

  const shouldShowLoadingSpinner =
    (Boolean(onCreateOKR) && loading && !isConnectionLoaded) || (Boolean(onCreateOKR) && !called)

  useEffect(() => {
    if (isOpen) fetchActiveCycles()
  }, [isOpen, fetchActiveCycles])

  useEffect(() => {
    const relatedCycles = activeCycles.filter((cycle) => cycle.id !== cycleID)

    setRelatedCycles(relatedCycles)
  }, [cycleID, activeCycles, setRelatedCycles])

  return (
    <Menu
      placement="bottom-end"
      variant="action-list"
      isOpen={isOpen}
      onClose={handleCloseMenu}
      onOpen={handleOpenMenu}
    >
      <MenuButton>
        {children ?? (
          <TreeDotsIcon
            desc={intl.formatMessage(messages.optionsButtonIconDesc)}
            fill="currentColor"
          />
        )}
      </MenuButton>
      <MenuList>
        {shouldShowLoadingSpinner ? (
          <ActionSpinner />
        ) : (
          <Actions
            currentCycleID={cycleID}
            relatedCycles={relatedCycles}
            onViewOldCycles={onViewOldCycles}
            onCreateOKR={onCreateOKR}
          />
        )}
      </MenuList>
    </Menu>
  )
}
