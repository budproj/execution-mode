import { AccordionPanel } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { objectiveContext } from 'src/state/recoil/objective/context'

import { ObjectiveKeyResults } from './key-results'

export interface ObjectiveAccordionPanelProperties {
  isExpanded: boolean
  objectiveID?: Objective['id']
  teamID?: Team['id']
  isDisabled?: boolean
}

export const ObjectiveAccordionPanel = ({
  isExpanded,
  objectiveID,
  isDisabled,
  teamID,
}: ObjectiveAccordionPanelProperties) => {
  const context = useRecoilValue(objectiveContext(objectiveID))

  return (
    <AccordionPanel p={0} maxWidth="100%">
      {isExpanded && (
        <ObjectiveKeyResults
          objectiveID={objectiveID}
          mode={context.mode}
          isDisabled={isDisabled}
          teamID={teamID}
        />
      )}
    </AccordionPanel>
  )
}
