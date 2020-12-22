import React, { useEffect } from 'react'

import { Team } from 'src/components/Team/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { teamAtomFamily } from 'src/state/recoil/team'

import TeamCard from './Card'

export interface TeamCardsProperties {
  teams?: Array<Partial<Team>>
  isLoading?: boolean
}

const TeamCards = ({ teams, isLoading }: TeamCardsProperties) => {
  const loadTeamsOnRecoil = useRecoilFamilyLoader<Team>(teamAtomFamily)

  useEffect(() => {
    if (teams) loadTeamsOnRecoil(teams)
  }, [teams, loadTeamsOnRecoil])

  return isLoading || !teams ? (
    <TeamCard />
  ) : (
    <>
      {teams.map(({ id }) => (
        <TeamCard key={id} id={id} />
      ))}
    </>
  )
}

export default TeamCards
