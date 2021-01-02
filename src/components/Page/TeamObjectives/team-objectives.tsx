import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { PageContent } from 'src/components/Base'
import { PageProperties } from 'src/components/Page/types'
import ChildTeamsObjectives from 'src/components/Team/ChildTeamsObjectives'
import { Team } from 'src/components/Team/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { pageTitleAtom } from 'src/state/recoil/page'
import { teamAtomFamily } from 'src/state/recoil/team'

import queries from './queries.gql'
import { GetTeamNameQuery } from './types'

export interface TeamObjectivesProperties extends PageProperties {
  teamId: Team['id']
}

const TeamObjectives = ({ teamId, isRootPage }: TeamObjectivesProperties) => {
  const setPageTitle = useSetRecoilState(pageTitleAtom)
  const { data, loading } = useQuery<GetTeamNameQuery>(queries.GET_TEAM_NAME, {
    variables: {
      teamId,
    },
  })
  const loadTeamOnRecoil = useRecoilFamilyLoader<Team>(teamAtomFamily)

  const breadcrumbParameters = {
    id: data?.team.name ?? '',
  }

  useEffect(() => {
    if (!data && loading) setPageTitle('')
  }, [data, loading, setPageTitle])

  useEffect(() => {
    if (!loading && data) setPageTitle(data?.team.name)
  }, [loading, data, setPageTitle])

  useEffect(() => {
    if (!loading && data) loadTeamOnRecoil(data?.team)
  }, [data, loading, loadTeamOnRecoil])

  return (
    <PageContent breadcrumbParams={breadcrumbParameters} showBreadcrumb={!isRootPage}>
      <ChildTeamsObjectives rootTeamId={teamId} />
    </PageContent>
  )
}

export default TeamObjectives
