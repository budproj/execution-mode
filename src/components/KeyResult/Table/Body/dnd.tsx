import { makeStyles, styled, TableBody, TableCell, TableRow, Theme } from '@material-ui/core'
import { KeyResult } from 'components/KeyResult/types'
import React, { ComponentType, ReactElement } from 'react'
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggingStyle,
  Droppable,
  NotDraggingStyle,
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

interface DraggableStylesProps {
  isDragging: boolean
}

const styles = (theme: Theme) => ({
  row: {
    backgroundColor: (props: DraggableStylesProps) =>
      props.isDragging ? theme.palette.primary.light : 'inherit',
    boxShadow: (props: DraggableStylesProps) =>
      props.isDragging ? `inset 0 1px 0px 0px ${theme.palette.grey[200]}` : 'inherit',

    '& td:first-child': {
      backgroundColor: theme.palette.common.white,
    },

    '&:hover': {
      backgroundColor: theme.palette.primary.light,

      '& td:first-child': {
        backgroundColor: theme.palette.common.white,
      },
    },
  },
})

export const buildDraggableRow = (id: KeyResult['id'], index: number): ComponentType => (
  props: Record<string, unknown>,
): ReactElement => {
  const intl = useIntl()
  const buildClasses = makeStyles(styles)

  return (
    <Draggable draggableId={id} index={index}>
      {(provided: DraggableProvided, { isDragging }: DraggableStateSnapshot) => (
        <TableRow
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={buildClasses({ isDragging }).row}
        >
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
