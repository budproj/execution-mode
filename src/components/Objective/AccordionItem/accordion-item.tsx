import { AccordionItem } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { Objective } from 'src/components/Objective/types'
import confidenceTagSelector from 'src/state/recoil/key-result/selectors/confidence-tag'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

import ObjectiveAccordionButton from './accordion-button'
import ObjectiveAccordionPanel from './accordion-panel'

export interface ObjectiveAccordionItemProperties {
  objectiveID?: Objective['id']
}

const ObjectiveAccordionItem = ({ objectiveID }: ObjectiveAccordionItemProperties) => {
  const objective = useRecoilValue(objectiveAtomFamily(objectiveID))
  const confidenceTag = useRecoilValue(confidenceTagSelector(objective?.currentConfidence))
  const isLoaded = Boolean(objective)

  return (
    <AccordionItem border="none" bg="white" boxShadow="sm" p={4}>
      {({ isExpanded }) => (
        <>
          <ObjectiveAccordionButton
            objective={objective}
            confidenceTag={confidenceTag}
            isLoaded={isLoaded}
          />
          <ObjectiveAccordionPanel isExpanded={isExpanded} objectiveID={objectiveID} />
        </>
      )}
    </AccordionItem>
  )
}

export default ObjectiveAccordionItem
