import { useLazyQuery } from '@apollo/client'
import { AccordionPanel } from '@chakra-ui/react'
import uniqueId from 'lodash/uniqueId'
import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import KeyResultList from 'src/components/KeyResult/List'
import { KEY_RESULT_LIST_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KeyResult } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

import { lastInsertedKeyResultIDAtom } from '../../../state/recoil/key-result/drawers/insert/last-inserted-key-result-id-atom'

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
  const lastInsertedKeyResultID = useRecoilValue(lastInsertedKeyResultIDAtom)
  const [fetchObjective, { data, called, loading }] = useLazyQuery<GetObjectiveKeyResultsQuery>(
    queries.GET_OBJECTIVE_KEY_RESULTS,
    {
      fetchPolicy: 'network-only',
    },
  )
  const loadObjective = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const loadKeyResults = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)
  const [keyResults, setKeyResultEdges] = useConnectionEdges<KeyResult>()

  const keyResultIDs = selectKeyResultIDs(keyResults)
  const keyResultListMatchesDataLength =
    called && !loading && data?.objective?.keyResults?.edges.length === keyResultIDs?.length
  const isLoading = !lastInsertedKeyResultID && !keyResultListMatchesDataLength

  const handleLineClick = (id: KeyResult['id']) => setOpenDrawer(id)

  useEffect(() => {
    if (isExpanded || Boolean(lastInsertedKeyResultID))
      fetchObjective({ variables: { objectiveID } })
  }, [isExpanded, lastInsertedKeyResultID, fetchObjective, objectiveID])

  useEffect(() => {
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
    <AccordionPanel pb={0}>
      {isExpanded && (
        <KeyResultList
          id={`OBJECTIVE_${objectiveID ?? uniqueId()}_ACCORDION`}
          pt={4}
          keyResultIDs={keyResultIDs}
          isLoading={isLoading}
          templateColumns="2fr 1fr 0.1fr 1fr"
          columns={[
            KEY_RESULT_LIST_COLUMN.KEY_RESULT,
            KEY_RESULT_LIST_COLUMN.PROGRESS,
            KEY_RESULT_LIST_COLUMN.PERCENTUAL_PROGRESS,
            KEY_RESULT_LIST_COLUMN.OWNER,
          ]}
          headProperties={{
            [KEY_RESULT_LIST_COLUMN.PERCENTUAL_PROGRESS]: {
              hidden: true,
            },
          }}
          bodyProperties={{
            [KEY_RESULT_LIST_COLUMN.KEY_RESULT]: {
              withLastUpdateInfo: true,
              withDynamicIcon: true,
            },
            [KEY_RESULT_LIST_COLUMN.PROGRESS]: {
              withConfidenceTag: true,
            },
            [KEY_RESULT_LIST_COLUMN.PERCENTUAL_PROGRESS]: {
              isDisabled: true,
            },
            [KEY_RESULT_LIST_COLUMN.OWNER]: {
              displayName: true,
              displayRole: true,
            },
          }}
          onLineClick={handleLineClick}
        />
      )}
    </AccordionPanel>
  )
}

export default ObjectiveAccordionPanel
