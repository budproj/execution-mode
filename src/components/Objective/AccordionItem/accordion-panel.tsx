import { useLazyQuery } from '@apollo/client'
import { AccordionPanel } from '@chakra-ui/react'
import isEqual from 'lodash/isEqual'
import uniqueId from 'lodash/uniqueId'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import KeyResultList from 'src/components/KeyResult/List'
import { KEY_RESULT_LIST_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KeyResult } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { keyResultDrawerOpen } from 'src/state/recoil/key-result/drawer'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

import queries from './queries.gql'

export interface ObjectiveAccordionPanelProperties {
  isExpanded: boolean
  objectiveID?: Objective['id']
}

export interface GetObjectiveKeyResultsQuery {
  objective: Partial<Objective>
}

const selectKeyResultIDs = (keyResults?: KeyResult[]) =>
  keyResults?.map((keyResult) => keyResult.id)

const ObjectiveAccordionPanel = ({
  isExpanded,
  objectiveID,
}: ObjectiveAccordionPanelProperties) => {
  const [fetchObjective, { data, loading, called }] = useLazyQuery<GetObjectiveKeyResultsQuery>(
    queries.GET_OBJECTIVE_KEY_RESULTS,
  )
  const loadObjective = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const loadKeyResults = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const setOpenDrawer = useSetRecoilState(keyResultDrawerOpen)
  const [keyResults, setKeyResultEdges] = useConnectionEdges<KeyResult>()

  const keyResultIDs = selectKeyResultIDs(keyResults)
  const syncedWithLocalState =
    called &&
    !loading &&
    typeof data !== 'undefined' &&
    isEqual(keyResultIDs, selectKeyResultIDs(keyResults))

  const handleLineClick = (id: KeyResult['id']) => setOpenDrawer(id)

  useEffect(() => {
    if (isExpanded && !called) fetchObjective({ variables: { objectiveID } })
  }, [isExpanded, called, fetchObjective, objectiveID])

  useEffect(() => {
    console.log('tag')
    if (data) {
      loadObjective(data?.objective)
      setKeyResultEdges(data.objective.keyResults?.edges)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setKeyResultEdges])

  useEffect(() => {
    if (keyResults) loadKeyResults(keyResults)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyResults])

  return (
    <AccordionPanel>
      {isExpanded && (
        <KeyResultList
          id={`OBJECTIVE_${objectiveID ?? uniqueId()}_ACCORDION`}
          py={8}
          keyResultIDs={keyResultIDs}
          isLoading={!syncedWithLocalState}
          templateColumns="0.1fr 2fr 1fr 2fr 1fr 2fr"
          columns={[
            KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL_COLOR,
            KEY_RESULT_LIST_COLUMN.KEY_RESULT,
            KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL,
            KEY_RESULT_LIST_COLUMN.PROGRESS,
            KEY_RESULT_LIST_COLUMN.CYCLE,
            KEY_RESULT_LIST_COLUMN.OWNER,
          ]}
          headProperties={{
            [KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL_COLOR]: {
              hidden: true,
            },
          }}
          bodyProperties={{
            [KEY_RESULT_LIST_COLUMN.KEY_RESULT]: {
              withLastUpdateInfo: true,
            },
            [KEY_RESULT_LIST_COLUMN.OWNER]: {
              displayName: true,
            },
          }}
          onLineClick={handleLineClick}
        />
      )}
    </AccordionPanel>
  )
}

export default ObjectiveAccordionPanel
