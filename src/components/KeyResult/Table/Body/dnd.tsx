import { styled, TableBody, TableCell, TableRow } from '@material-ui/core'
import { KeyResult } from 'components/KeyResult/types'
import React, { ComponentType, ReactElement } from 'react'
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd'
import ReorderIcon from 'components/Icons/Reorder'
import { useIntl } from 'react-intl'

import messages from './messages'

export const buildDroppableBody = (onDragEnd: OnDragEndResponder) => (
  props: Record<string, unknown>,
): ReactElement => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="list" direction="vertical">
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

const StyledDragHandler = styled(TableCell)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.grey[300],
  borderBottom: 'none',
  width: 10,
  padding: '0 10px 0 0',
}))

export const buildDraggableRow = (id: KeyResult['id'], index: number): ComponentType => (
  props: Record<string, unknown>,
): ReactElement => {
  const intl = useIntl()

  return (
    <Draggable draggableId={id} index={index}>
      {(provided: DraggableProvided) => (
        <TableRow ref={provided.innerRef} {...provided.draggableProps} {...props}>
          <StyledDragHandler {...provided.dragHandleProps}>
            <ReorderIcon
              desc={intl.formatMessage(messages.reorderIconDesc)}
              fontSize="inherit"
              htmlColor="inherit"
            />
          </StyledDragHandler>
          {props.children}
        </TableRow>
      )}
    </Draggable>
  )
}
