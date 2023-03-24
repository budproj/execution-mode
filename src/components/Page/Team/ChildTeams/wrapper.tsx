import { Button, Stack } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import SaveTeamModal from 'src/components/Team/SaveTeamModal'
import { GraphQLEffect } from 'src/components/types'

import { useConnectionEdges } from '../../../../state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from '../../../../state/recoil/hooks'
import { isEditTeamModalOpenAtom, teamAtomFamily } from '../../../../state/recoil/team'
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
  const setIsTeamModalOpenAtom = useSetRecoilState(isEditTeamModalOpenAtom)

  const hasCreateTeamPermission = team?.users?.policy?.create === GraphQLEffect.ALLOW

  useEffect(() => {
    if (team) setChildTeamEdges(team.teams?.edges)
  }, [team, setChildTeamEdges])

  const handleOpenModal = useCallback(() => {
    setIsTeamModalOpenAtom({ isModalOpen: true, isEditingTeamId: undefined })
  }, [setIsTeamModalOpenAtom])

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
            <Button variant="text" colorScheme="brand" onClick={handleOpenModal}>
              {intl.formatMessage(messages.createSubteamButtonText)}
            </Button>
          )}
        </Stack>
      ) : (
        <TeamListSearchable
          teams={childTeams}
          isLoading={!isLoaded}
          openModal={handleOpenModal}
          hasPermission={hasCreateTeamPermission}
        />
      )}
      <SaveTeamModal />
    </TeamSectionWrapper>
  )
}
