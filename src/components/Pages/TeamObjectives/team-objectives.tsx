import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { PageContent } from 'src/components/Base'
import companyQueries from 'src/components/Company/queries.gql'
import ChildTeamsObjectives from 'src/components/Team/ChildTeamsObjectives'
import teamQueries from 'src/components/Team/queries.gql'
import { Team } from 'src/components/Team/types'
import { companyAtomFamily } from 'src/state/recoil/company'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { pageTitleAtom } from 'src/state/recoil/page'
import { teamAtomFamily } from 'src/state/recoil/team'

export interface TeamObjectivesProperties {
  teamId: Team['id']
  isCompany?: boolean
}

const TeamObjectives = ({ teamId, isCompany }: TeamObjectivesProperties) => {
  const query = isCompany ? companyQueries.GET_COMPANY_NAME : teamQueries.GET_TEAM_NAME
  const variables = isCompany ? { companyId: teamId } : { teamId }
  const key = isCompany ? 'company' : 'team'

  const setPageTitle = useSetRecoilState(pageTitleAtom)
  const { data, loading } = useQuery(query, { variables })
  const loadTeamOnRecoil = useRecoilFamilyLoader<Team>(
    isCompany ? companyAtomFamily : teamAtomFamily,
  )

  useEffect(() => {
    if (!data && loading) setPageTitle('')
  }, [data, loading, setPageTitle])

  useEffect(() => {
    if (!loading && data) setPageTitle(data[key].name)
  }, [loading, data, key, setPageTitle])

  useEffect(() => {
    if (!loading && data) loadTeamOnRecoil(data[key])
  }, [data, loading, key, loadTeamOnRecoil])

  return (
    <PageContent>
      <ChildTeamsObjectives rootTeamId={teamId} />
    </PageContent>
  )
}

export default TeamObjectives
