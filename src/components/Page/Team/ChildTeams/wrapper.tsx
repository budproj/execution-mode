import { Button, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import SaveTeamModal from 'src/components/Team/SaveTeamModal'
import { GraphQLEffect } from 'src/components/types'

import { useConnectionEdges } from '../../../../state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from '../../../../state/recoil/hooks'
import { teamAtomFamily } from '../../../../state/recoil/team'
import { EmptyState } from '../../../Base'
import { Team } from '../../../Team/types'
import { TeamSectionWrapper } from '../Section/wrapper'

import messages from './messages'
import { TeamListSearchable } from './team-list-searchable'

interface ChildTeamsWrapperProperties {
  teamID?: string
  isLoading?: boolean
}

export const ChildTeamsWrapper = ({ teamID, isLoading }: ChildTeamsWrapperProperties) => {
  const intl = useIntl()
  const [isLoaded, setIsLoaded] = useState(false)
  const team = useRecoilValue(teamAtomFamily(teamID))
  const [childTeams, setChildTeamEdges, childTeamEdges] = useConnectionEdges<Team>()
  const [loadTeamsOnRecoil] = useRecoilFamilyLoader<Team>(teamAtomFamily)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const hasCreateTeamPermission = team?.users?.policy?.create === GraphQLEffect.ALLOW

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    if (team) setChildTeamEdges(team.teams?.edges)
  }, [team, setChildTeamEdges])

  useEffect(() => {
    loadTeamsOnRecoil(childTeams)
  }, [childTeams, loadTeamsOnRecoil])

  useEffect(() => {
    if (!isLoaded && !isLoading && childTeamEdges) setIsLoaded(true)
  }, [isLoaded, isLoading, childTeamEdges, setIsLoaded])

  useEffect(() => {
    if (!childTeamEdges) setIsLoaded(false)
  }, [childTeamEdges, setIsLoaded])

  return (
    <TeamSectionWrapper
      title={intl.formatMessage(messages.title, {
        isLoaded,
        totalTeamsCount: childTeams.length,
      })}
    >
      {isLoaded && childTeams.length === 0 ? (
        <Stack pt={2} pb={8} spacing={0}>
          <EmptyState imageKey="empty-folder" labelMessage={messages.emptyState} py={0} />
          {hasCreateTeamPermission && (
            <Button variant="text" colorScheme="brand" onClick={openModal}>
              {intl.formatMessage(messages.createSubteamButtonText)}
            </Button>
          )}
        </Stack>
      ) : (
        <TeamListSearchable
          teams={childTeams}
          isLoading={!isLoaded}
          openModal={openModal}
          hasPermission={hasCreateTeamPermission}
        />
      )}
      <SaveTeamModal isOpen={isModalOpen} onClose={closeModal} />
    </TeamSectionWrapper>
  )
}
