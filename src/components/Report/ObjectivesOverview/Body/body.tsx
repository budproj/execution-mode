import React, { useEffect } from 'react'

import { Objective } from 'src/components/Objective/types'
import OverviewBodyBox from 'src/components/Report/Overview/OverviewBodyBox'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

export interface ObjectivesOverviewBodyProperties {
  objectives?: Array<Partial<Objective>>
}

const ObjectivesOverviewBody = ({ objectives }: ObjectivesOverviewBodyProperties) => {
  const loadObjectives = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const hasObjectives = objectives && objectives.length > 0 && true

  useEffect(() => {
    if (hasObjectives) loadObjectives(objectives)
  }, [hasObjectives, objectives, loadObjectives])

  return (
    <OverviewBodyBox>
      <p>Body</p>
    </OverviewBodyBox>
  )
}

export default ObjectivesOverviewBody
