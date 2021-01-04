import React, { useEffect } from 'react'

import { Objective } from 'src/components/Objective/types'
import OverviewBodyBox from 'src/components/Report/Overview/OverviewBodyBox'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

import ObjectivesOverviewBodyLine from './Line'

export interface ObjectivesOverviewBodyProperties {
  noOfSkeletons: number
  objectives?: Array<Partial<Objective>>
}

const ObjectivesOverviewBody = ({
  objectives,
  noOfSkeletons,
}: ObjectivesOverviewBodyProperties) => {
  const loadObjectives = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const hasObjectives = objectives && objectives.length > 0 && true
  // eslint-disable-next-line unicorn/no-null
  const emptyState = new Array(noOfSkeletons).fill(null)

  useEffect(() => {
    if (hasObjectives) loadObjectives(objectives)
  }, [hasObjectives, objectives, loadObjectives])

  return (
    <OverviewBodyBox p={0}>
      {hasObjectives
        ? objectives?.map((objective, index) => (
            <ObjectivesOverviewBodyLine
              key={objective.id}
              id={objective.id}
              orderTagNumber={index + 1}
              enableBorder={index !== objectives.length - 1}
            />
          ))
        : emptyState.map((_, index) => (
            <ObjectivesOverviewBodyLine
              key={Math.random().toString()}
              orderTagNumber={index + 1}
              enableBorder={index !== emptyState.length - 1}
            />
          ))}
    </OverviewBodyBox>
  )
}

ObjectivesOverviewBody.defaultProps = {
  noOfSkeletons: 3,
}

export default ObjectivesOverviewBody
