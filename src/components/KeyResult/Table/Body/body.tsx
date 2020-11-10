import { TableBody, TableRow } from '@material-ui/core'
import React, { ReactElement, useEffect } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { useRecoilStateLoadable, useRecoilValueLoadable } from 'recoil'

import { KeyResult } from 'components/KeyResult'
import logger from 'lib/logger'
import { hasFetchedAllValues } from 'specifications'
import { buildCustomSorter } from 'state/actions/users'
import {
  remoteKeyResults as remoteKeyResultsAtom,
  selectRemoteKeyResults,
} from 'state/recoil/key-results/remote'
import { userKeyResultsCustomSorting as userCustomSortingAtom } from 'state/recoil/users/current/custom-sorting/key-results'
import { userID as userIDAtom } from 'state/recoil/users/current/id'

import { Cycle, Okr, Owner, Progress, Status, Title } from './Cells'
import { buildDroppableBody, buildDraggableRow } from './dnd'
import Skeleton from './skeleton'

const KeyResultsTableBody = (): ReactElement => {
  const userID = useRecoilValueLoadable(userIDAtom)
  const remoteKeyResultsRepository = useRecoilValueLoadable(remoteKeyResultsAtom)
  const [remoteKeyResults, setRemoteKeyResults] = useRecoilStateLoadable(selectRemoteKeyResults)
  const [userCustomSorting, setUserCustomSorting] = useRecoilStateLoadable(userCustomSortingAtom)
  const reorderCustomSorting = buildCustomSorter(userID, userCustomSorting, setUserCustomSorting)

  const wasRemoteDataFetched = hasFetchedAllValues(remoteKeyResults)
  const wasOrderFetched = hasFetchedAllValues(userCustomSorting)

  useEffect(() => {
    if (wasRemoteDataFetched && !remoteKeyResultsRepository.getValue())
      setRemoteKeyResults(remoteKeyResults.getValue())
  }, [wasRemoteDataFetched, remoteKeyResultsRepository, remoteKeyResults, setRemoteKeyResults])

  logger.debug('Rerendered Key Results table body. Take a look at our Recoil hooks data:', {
    data: {
      remoteKeyResultsRepository,
      userCustomSorting,
    },
    component: 'KeyResultsTableBody',
  })

  const onDragEnd = ({ source, destination }: DropResult) =>
    destination && destination.index !== source.index
      ? reorderCustomSorting(source.index, destination.index)
      : userCustomSorting.getValue()

  return wasOrderFetched ? (
    <TableBody component={buildDroppableBody(onDragEnd)}>
      {userCustomSorting.getValue().map((id: KeyResult['id'], index: number) => (
        <TableRow key={id} component={buildDraggableRow(id, index)}>
          <Title id={id} />
          <Okr id={id} />
          <Status id={id} />
          <Progress id={id} />
          <Cycle id={id} />
          <Owner id={id} />
        </TableRow>
      ))}
    </TableBody>
  ) : (
    <Skeleton />
  )
}

export default KeyResultsTableBody
