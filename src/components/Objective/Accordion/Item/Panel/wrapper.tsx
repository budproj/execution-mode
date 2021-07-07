import { AccordionPanel } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { Objective } from 'src/components/Objective/types'
import { objectiveContext, ObjectiveMode } from 'src/state/recoil/objective/context'

import { teamAtomFamily } from '../../../../../state/recoil/team'
import { GraphQLEffect } from '../../../../types'

import { InsertKeyResultButton } from './insert-key-result'
import { ObjectiveKeyResults } from './key-results'

export interface ObjectiveAccordionPanelProperties {
  isExpanded: boolean
  objectiveID?: Objective['id']
  teamID?: string
  isDisabled?: boolean
}

export const ObjectiveAccordionPanel = ({
  isExpanded,
  objectiveID,
  teamID,
  isDisabled,
}: ObjectiveAccordionPanelProperties) => {
  const team = useRecoilValue(teamAtomFamily(teamID))
  const context = useRecoilValue(objectiveContext(objectiveID))

  const canCreateKeyResult = team?.keyResults?.policy?.create === GraphQLEffect.ALLOW
  const showInsertButton = context.mode === ObjectiveMode.EDIT && canCreateKeyResult

  return (
    <AccordionPanel pb={0}>
      {isExpanded && (
        <>
          <ObjectiveKeyResults
            objectiveID={objectiveID}
            mode={context.mode}
            isDisabled={isDisabled}
          />
          {showInsertButton && !isDisabled && <InsertKeyResultButton objectiveID={objectiveID} />}
        </>
      )}
    </AccordionPanel>
  )
}
