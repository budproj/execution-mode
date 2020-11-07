import { TableBody, TableRow, TableCell } from '@material-ui/core'
import React, { ReactElement } from 'react'
import {
  DragDropContext,
  Droppable,
  DropResult,
  OnDragEndResponder,
  Draggable,
} from 'react-beautiful-dnd'
import { useRecoilStateLoadable, useRecoilValueLoadable } from 'recoil'

import { KeyResult } from 'components/KeyResult'
import logger from 'lib/logger'
import { hasFetchedAllValues } from 'specifications'
import { buildCustomSorter } from 'state/actions/users'
import { allKeyResults as allKeyResultsAtom } from 'state/recoil/keyResults/all'
import { userKeyResultsCustomSorting as userCustomSortingAtom } from 'state/recoil/users/current/customSorting/keyResults'
import { userID as userIDAtom } from 'state/recoil/users/current/id'

const DroppableBody = (onDragEnd: OnDragEndResponder) => (
  props: Record<string, unknown>,
): ReactElement => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId={'list'} direction="vertical">
      {(provided) => {
        return (
          <TableBody ref={provided.innerRef} {...provided.droppableProps} {...props}>
            {props.children}
            {provided.placeholder}
          </TableBody>
        )
      }}
    </Droppable>
  </DragDropContext>
)

const DraggableRow = (id: KeyResult['id'], index: number) => (
  props: Record<string, unknown>,
): ReactElement => (
  <Draggable draggableId={id} index={index}>
    {(provided) => (
      <TableRow ref={provided.innerRef} {...provided.draggableProps} {...props}>
        <p {...provided.dragHandleProps}>Test</p>
        {props.children}
      </TableRow>
    )}
  </Draggable>
)

const KeyResultsTableBody = (): ReactElement => {
  const userID = useRecoilValueLoadable(userIDAtom)
  const allKeyResults = useRecoilValueLoadable(allKeyResultsAtom)
  const [userCustomSorting, setUserCustomSorting] = useRecoilStateLoadable(userCustomSortingAtom)
  const reorderCustomSorting = buildCustomSorter(userID, userCustomSorting, setUserCustomSorting)

  const wasDataFetched = hasFetchedAllValues(userID, userCustomSorting)

  logger.debug('Rerendered Key Results table body. Take a look at our Recoil hooks data:', {
    data: {
      allKeyResults,
      userCustomSorting,
    },
    component: 'KeyResultsTableBody',
  })

  const onDragEnd = ({ source, destination }: DropResult) =>
    destination && destination.index !== source.index
      ? reorderCustomSorting(source.index, destination.index)
      : userCustomSorting.getValue()

  return wasDataFetched ? (
    <TableBody component={DroppableBody(onDragEnd)}>
      {userCustomSorting.getValue().map((id: KeyResult['id'], index: number) => (
        <TableRow component={DraggableRow(id, index)} key={id}>
          <TableCell>{id}</TableCell>
          <TableCell>{id}</TableCell>
          <TableCell>{id}</TableCell>
          <TableCell>{id}</TableCell>
          <TableCell>{id}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  ) : (
    <div>Loading...</div>
  )
}

export default KeyResultsTableBody
