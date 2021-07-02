import { AccordionPanel } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { Objective } from 'src/components/Objective/types'

import {
  AccordionEntryMode,
  objectiveAccordionEntryModes,
} from '../../../../../state/recoil/objective/accordion'
import { teamAtomFamily } from '../../../../../state/recoil/team'
import { GraphQLEffect } from '../../../../types'

import { InsertKeyResultButton } from './insert-key-result'
import { ObjectiveKeyResults } from './key-results'

export interface ObjectiveAccordionPanelProperties {
  isExpanded: boolean
  accordionID?: string
  objectiveID?: Objective['id']
  teamID?: string
  isDisabled?: boolean
}

export const ObjectiveAccordionPanel = ({
  isExpanded,
  objectiveID,
  accordionID,
  teamID,
  isDisabled,
}: ObjectiveAccordionPanelProperties) => {
  const team = useRecoilValue(teamAtomFamily(teamID))
  const accordionEntry = useRecoilValue(objectiveAccordionEntryModes(accordionID))

  const mode = objectiveID ? accordionEntry[objectiveID].mode : AccordionEntryMode.VIEW
  const canCreateKeyResult = team?.keyResults?.policy?.create === GraphQLEffect.ALLOW
  const showInsertButton = mode === AccordionEntryMode.EDIT && canCreateKeyResult

  return (
    <AccordionPanel pb={0}>
      {isExpanded && (
        <>
          <ObjectiveKeyResults objectiveID={objectiveID} mode={mode} isDisabled={isDisabled} />
          {showInsertButton && !isDisabled && <InsertKeyResultButton objectiveID={objectiveID} />}
        </>
      )}
    </AccordionPanel>
  )
}
