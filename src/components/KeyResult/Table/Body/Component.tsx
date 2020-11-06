import { TableBody, TableRow, TableCell } from '@material-ui/core'
import React, { ReactElement } from 'react'
import {
  DragDropContext,
  Droppable,
  DropResult,
  OnDragEndResponder,
  Draggable,
} from 'react-beautiful-dnd'

import { KeyResult } from 'components/KeyResult'
import logger from 'lib/logger'
import { hasFetchedAllValues } from 'specifications'
import { useKeyResults } from 'state/hooks'

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
  const keyResults = useKeyResults()
  const wasDataFetched = hasFetchedAllValues(keyResults.customSorting)

  logger.debug('Rerendered Key Results table body. Take a look at the keyResults hook data:', {
    data: keyResults,
    component: 'KeyResultsTableBody',
  })

  const onDragEnd = ({ source, destination }: DropResult) =>
    destination && destination.index !== source.index
      ? keyResults.reorder(source.index, destination.index)
      : keyResults.customSorting

  return wasDataFetched ? (
    <TableBody component={DroppableBody(onDragEnd)}>
      {keyResults.customSorting.contents.map((id: KeyResult['id'], index: number) => (
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
