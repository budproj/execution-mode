import { useLazyQuery } from '@apollo/client'
import uniqueId from 'lodash/uniqueId'
import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import KeyResultList from 'src/components/KeyResult/List'
import { KEY_RESULT_LIST_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KEY_RESULT_MODE } from 'src/components/KeyResult/constants'
import { KeyResult } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'
import { objectiveAtomFamily } from 'src/state/recoil/objective'
import { ObjectiveContext, ObjectiveViewMode } from 'src/state/recoil/objective/context'

import { lastInsertedKeyResultIDAtom } from '../../../../../state/recoil/key-result/drawers/insert/last-inserted-key-result-id-atom'

import { DraftButtons } from './draft-buttons'
import messages from './messages'
import queries from './queries.gql'

export interface ObjectiveKeyResultsProperties {
  objectiveID?: Objective['id']
  mode?: ObjectiveViewMode
  isDisabled?: boolean
  teamID?: Team['id']
  isDraft?: boolean
  context?: ObjectiveContext
}

export interface GetObjectiveKeyResultsQuery {
  objective: Partial<Objective>
}

const selectKeyResultIDs = (keyResults?: KeyResult[]) =>
  keyResults?.map((keyResult) => keyResult.id)

export const ObjectiveKeyResults = ({
  objectiveID,
  teamID,
  mode,
  isDisabled,
  isDraft,
  context,
  ...rest
}: ObjectiveKeyResultsProperties) => {
  const lastInsertedKeyResultID = useRecoilValue(lastInsertedKeyResultIDAtom)
  const [loadObjective] = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const [loadKeyResults] = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)
  const [keyResults, setKeyResultEdges, keyResultEdges, isLoaded] = useConnectionEdges<KeyResult>()
  const [getKeyResults, { called }] = useLazyQuery<GetObjectiveKeyResultsQuery>(
    queries.GET_OBJECTIVE_KEY_RESULTS,
    {
      fetchPolicy: 'network-only',
      variables: {
        objectiveID,
        withTeams: Boolean(teamID),
        mode: isDraft ? KEY_RESULT_MODE.DRAFT : KEY_RESULT_MODE.PUBLISHED,
      },
      onCompleted: (data) => {
        loadObjective(data.objective)
        setKeyResultEdges(data.objective.keyResults?.edges)
      },
    },
  )

  const keyResultIDs = selectKeyResultIDs(keyResults)

  const handleLineClick = (id: KeyResult['id']) => setOpenDrawer(id)
  const templateColumns = '2fr 1fr 0.8fr 40px'
  const columns = [
    KEY_RESULT_LIST_COLUMN.KEY_RESULT,
    KEY_RESULT_LIST_COLUMN.PROGRESS,
    KEY_RESULT_LIST_COLUMN.OWNER,
    KEY_RESULT_LIST_COLUMN.ACTIONS,
  ]

  const handleKeyResultDelete = (id?: string) => {
    if (!id) return

    const filteredKeyResultEdges = keyResultEdges?.filter((edge) => edge.node.id !== id) ?? []

    setKeyResultEdges(filteredKeyResultEdges)
  }

  useEffect(() => {
    if (isLoaded) {
      loadKeyResults(keyResults)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyResults, isLoaded])

  useEffect(() => {
    if (!called || lastInsertedKeyResultID) getKeyResults()
  }, [called, lastInsertedKeyResultID, getKeyResults])

  return (
    <>
      <KeyResultList
        id={`OBJECTIVE_${objectiveID ?? uniqueId()}_ACCORDION`}
        keyResultIDs={keyResultIDs}
        isLoading={!isLoaded}
        templateColumns={templateColumns}
        columns={columns}
        emptyStateMessage={
          isDraft
            ? messages.keyResultListDraftEmptyStateMessage
            : messages.keyResultListEmptyStateMessage
        }
        headProperties={{
          [KEY_RESULT_LIST_COLUMN.KEY_RESULT]: {
            hidden: true,
          },
          [KEY_RESULT_LIST_COLUMN.PROGRESS]: {
            hidden: true,
          },
          [KEY_RESULT_LIST_COLUMN.OWNER]: {
            hidden: true,
          },
          [KEY_RESULT_LIST_COLUMN.ACTIONS]: {
            hidden: true,
          },
        }}
        bodyProperties={{
          [KEY_RESULT_LIST_COLUMN.KEY_RESULT]: {
            withLastUpdateInfo: true,
            withDynamicIcon: true,
            isDisabled,
          },
          [KEY_RESULT_LIST_COLUMN.PROGRESS]: {
            withConfidenceTag: true,
            isActive: !isDisabled,
            isDisabled,
          },
          [KEY_RESULT_LIST_COLUMN.OWNER]: {
            displayName: true,
            displayRole: true,
            showOnlyOwner: true,
          },
          [KEY_RESULT_LIST_COLUMN.ACTIONS]: {
            onDelete: handleKeyResultDelete,
          },
        }}
        mode={mode}
        onLineClick={handleLineClick}
        {...rest}
      />
      {isDraft && context?.mode !== ObjectiveViewMode.EDIT && (
        <DraftButtons objectiveID={objectiveID} isObjectiveWithKeyResults={keyResults.length > 0} />
      )}
    </>
  )
}
