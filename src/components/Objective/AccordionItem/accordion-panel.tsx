import { useLazyQuery } from '@apollo/client'
import { AccordionPanel } from '@chakra-ui/react'
import React, { useCallback, useEffect } from 'react'

import KeyResultList from 'src/components/KeyResult/List'
import { KeyResultListBodyColumn } from 'src/components/KeyResult/List/Body/Columns/types'
import { KeyResult } from 'src/components/KeyResult/types'
import queries from 'src/components/Objective/queries.gql'
import { GetObjectiveKeyResultsQuery, Objective } from 'src/components/Objective/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

export interface ObjectiveAccordionPanelProperties {
  isExpanded: boolean
  objectiveID?: Objective['id']
}

const ObjectiveAccordionPanel = ({
  isExpanded,
  objectiveID,
}: ObjectiveAccordionPanelProperties) => {
  const [fetchObjective, { data, loading, called }] = useLazyQuery<GetObjectiveKeyResultsQuery>(
    queries.GET_OBJECTIVE_KEY_RESULTS,
  )
  const loadObjective = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const loadKeyResults = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const keyResultIDs = data?.objective?.keyResults?.map((keyResult) => keyResult.id)
  const isLoaded = Boolean(keyResultIDs)

  const updateObjective = useCallback(() => {
    loadObjective(data?.objective)
    // If we add the "loadObjective" in our deps it starts an infinite loop upon execution, since
    // it changes on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const updateKeyResults = useCallback(() => {
    loadKeyResults(data?.objective?.keyResults)
    // If we add the "loadKeyResults" in our deps it starts an infinite loop upon execution, since
    // it changes on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (isExpanded && !called) fetchObjective({ variables: { objectiveID } })
  }, [isExpanded, called, fetchObjective, objectiveID])

  useEffect(() => {
    if (!loading && data) {
      updateObjective()
      updateKeyResults()
    }
  }, [loading, data, updateObjective, updateKeyResults])

  return (
    <AccordionPanel>
      {isLoaded && isExpanded ? (
        <KeyResultList
          keyResultIDs={keyResultIDs}
          templateColumns="2fr 1fr 2fr 1fr 1fr"
          columns={[
            KeyResultListBodyColumn.TITLE,
            KeyResultListBodyColumn.STATUS,
            KeyResultListBodyColumn.PROGRESS,
            KeyResultListBodyColumn.CYCLE,
            KeyResultListBodyColumn.OWNER,
          ]}
        />
      ) : (
        <p>Loading...</p>
      )}
    </AccordionPanel>
  )
}

export default ObjectiveAccordionPanel
