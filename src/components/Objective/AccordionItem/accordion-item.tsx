import { AccordionItem } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { Objective } from 'src/components/Objective/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

import ObjectiveAccordionButton from './accordion-button'
import ObjectiveAccordionPanel from './accordion-panel'

export interface ObjectiveAccordionItemProperties {
  objectiveID?: Objective['id']
}

const ObjectiveAccordionItem = ({ objectiveID }: ObjectiveAccordionItemProperties) => {
  const objective = useRecoilValue(objectiveAtomFamily(objectiveID))
  const [confidenceTag, setConfidence] = useConfidenceTag(objective?.status?.confidence)
  const isLoaded = Boolean(objective)

  useEffect(() => {
    if (typeof objective?.status?.confidence !== 'undefined')
      setConfidence(objective?.status?.confidence)
  }, [objective, setConfidence])

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
