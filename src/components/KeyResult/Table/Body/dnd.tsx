import { makeStyles, styled, TableBody, TableCell, TableRow, Theme } from '@material-ui/core'
import React, { ComponentType, ReactElement } from 'react'
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd'
import { useIntl } from 'react-intl'

import ReorderIcon from 'components/Icons/Reorder'
import { KeyResult } from 'components/KeyResult/types'

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
  width: '1%',
  padding: '0 10px 0 0',
}))

interface DraggableStylesProps {
  isDragging: boolean
}

const styles = (theme: Theme) => ({
  row: {
    backgroundColor: (props: DraggableStylesProps) =>
      props.isDragging ? theme.palette.primary.light : 'inherit',
    transition: '0.6s all ease-out',

    '& td': {
      borderColor: (props: DraggableStylesProps) =>
        props.isDragging ? 'transparent' : theme.palette.grey[100],
      borderStyle: 'solid',
      borderWidth: '0.5px 0',

      '&:first-child': {
        backgroundColor: theme.palette.common.white,
        borderColor: 'transparent',
      },

      '&:nth-child(2)': {
        borderWidth: '0.5px 1px 0.5px 0',
      },
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
