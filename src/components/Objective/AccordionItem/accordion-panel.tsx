import { useLazyQuery } from '@apollo/client'
import { AccordionPanel } from '@chakra-ui/react'
import React, { useCallback, useEffect } from 'react'

import queries from 'src/components/Objective/queries.gql'
import { Objective } from 'src/components/Objective/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

export interface ObjectiveAccordionPanelProperties {
  isExpanded: boolean
  objectiveID?: Objective['id']
}

const ObjectiveAccordionPanel = ({
  isExpanded,
  objectiveID,
}: ObjectiveAccordionPanelProperties) => {
  const [fetchObjective, { data, loading, called }] = useLazyQuery(
    queries.GET_OBJECTIVE_KEY_RESULTS,
  )
  const setObjective = useRecoilFamilyLoader<Partial<Objective> | undefined>(objectiveAtomFamily)

  const updateObjective = useCallback(() => {
    setObjective(data.objective)
  }, [data, setObjective])

  useEffect(() => {
    if (isExpanded && !called) fetchObjective({ variables: { objectiveID } })
  }, [isExpanded, called, fetchObjective, objectiveID])

  useEffect(() => {
    if (!loading && data) updateObjective()
  }, [loading, data, updateObjective])

  return <AccordionPanel>Ok</AccordionPanel>
}

export default ObjectiveAccordionPanel
