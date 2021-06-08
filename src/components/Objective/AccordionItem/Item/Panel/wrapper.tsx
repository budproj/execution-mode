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
  accordionIndex: number
  accordionID?: string
  objectiveID?: Objective['id']
  teamID?: string
}

export const ObjectiveAccordionPanel = ({
  isExpanded,
  objectiveID,
  accordionID,
  accordionIndex,
  teamID,
}: ObjectiveAccordionPanelProperties) => {
  const team = useRecoilValue(teamAtomFamily(teamID))
  const accordionEntryModes = useRecoilValue(objectiveAccordionEntryModes(accordionID))

  const mode = accordionEntryModes[accordionIndex]
  const canCreateKeyResult = team?.keyResults?.policy?.create === GraphQLEffect.ALLOW
  const showInsertButton = mode === AccordionEntryMode.EDIT && canCreateKeyResult

  return (
    <AccordionPanel pb={0}>
      {isExpanded && (
        <>
          <ObjectiveKeyResults objectiveID={objectiveID} />
          {showInsertButton && <InsertKeyResultButton objectiveID={objectiveID} />}
        </>
      )}
    </AccordionPanel>
  )
}
