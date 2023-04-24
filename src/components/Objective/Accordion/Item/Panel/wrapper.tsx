import { AccordionPanel, Box } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { objectiveContext, ObjectiveMode } from 'src/state/recoil/objective/context'

import CreateObjectiveWorkflow from '../../Footer/create-objective-workflow'

import { ObjectiveKeyResults } from './key-results'

export interface ObjectiveAccordionPanelProperties {
  isExpanded: boolean
  objectiveID?: Objective['id']
  teamID?: Team['id']
  isDisabled?: boolean
  handleNextStep?: () => void
}

export const ObjectiveAccordionPanel = ({
  isExpanded,
  objectiveID,
  isDisabled,
  handleNextStep,
  teamID,
}: ObjectiveAccordionPanelProperties) => {
  const context = useRecoilValue(objectiveContext(objectiveID))

  return (
    <AccordionPanel p={0} maxWidth="100%">
      {isExpanded && (
        <>
          <ObjectiveKeyResults
            objectiveID={objectiveID}
            mode={context.mode}
            isDisabled={isDisabled}
            teamID={teamID}
          />
          {context.mode === ObjectiveMode.EDIT && (
            <Box mt={4}>
              <CreateObjectiveWorkflow objectiveId={objectiveID} handleNextStep={handleNextStep} />
            </Box>
          )}
        </>
      )}
    </AccordionPanel>
  )
}
