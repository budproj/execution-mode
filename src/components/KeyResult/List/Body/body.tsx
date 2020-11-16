import React, { ReactElement } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { useRecoilStateLoadable, useRecoilValueLoadable } from 'recoil'

import { GRID_TEMPLATE_COLUMN, BORDER_COLOR } from 'components/KeyResult/List/constants'
import { KeyResult } from 'components/KeyResult/types'
import logger from 'lib/logger'
import { hasFetchedAllValues } from 'specifications'
import { buildCustomSorter } from 'state/actions/users'
import { remoteKeyResults as remoteKeyResultsAtom } from 'state/recoil/key-results/remote'
import { userKeyResultsCustomSorting as userCustomSortingAtom } from 'state/recoil/users/current/custom-sorting/key-results'
import { userID as userIDAtom } from 'state/recoil/users/current/id'

import { Title, Okr, Status, Progress, Cycle, Owner } from './Items'
import DraggableGrid from './draggable-grid'
import DroppableBox from './droppable-box'
import Skeleton from './skeleton'

const component = 'KeyResultListBody'

const KeyResultListBody = (): ReactElement => {
  const userID = useRecoilValueLoadable(userIDAtom)
  const remoteKeyResults = useRecoilValueLoadable(remoteKeyResultsAtom)
  const [userCustomSorting, setUserCustomSorting] = useRecoilStateLoadable(userCustomSortingAtom)
  const reorderCustomSorting = buildCustomSorter(userID, userCustomSorting, setUserCustomSorting)

  const wasRemoteDataFetched = hasFetchedAllValues(userCustomSorting)

  logger.debug('Rerendered Key Results table body. Take a look at our Recoil hooks data:', {
    component,
    data: {
      remoteKeyResults,
      userCustomSorting,
    },
  })

  const handleDragEnd = ({ source, destination }: DropResult) =>
    destination && destination.index !== source.index
      ? reorderCustomSorting(source.index, destination.index)
      : userCustomSorting.getValue()

  return wasRemoteDataFetched ? (
    <DroppableBox onDragEnd={handleDragEnd}>
      {userCustomSorting.getValue().map((id: KeyResult['id'], index: number) => (
        <DraggableGrid
          key={id}
          id={id}
          index={index}
          alignItems="center"
          templateColumns={GRID_TEMPLATE_COLUMN}
          border={1}
          borderColor="transparent"
          borderStyle="solid"
          borderBottomColor={BORDER_COLOR}
          _hover={{ background: 'blue.50' }}
        >
          <Title id={id} />
          <Okr id={id} />
          <Status id={id} />
          <Progress id={id} />
          <Cycle id={id} />
          <Owner id={id} />
        </DraggableGrid>
      ))}
    </DroppableBox>
  ) : (
    <Skeleton />
  )
}

export default KeyResultListBody
