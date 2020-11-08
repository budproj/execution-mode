import { TableBody, TableRow } from '@material-ui/core'
import { KeyResult } from 'components/KeyResult/types'
import React, { ComponentType, ReactElement } from 'react'
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from 'react-beautiful-dnd'

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

export const buildDraggableRow = (id: KeyResult['id'], index: number): ComponentType => (
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
