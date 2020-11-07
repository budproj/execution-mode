import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: 'rgb(235,235,235)',
  }),
})

const DroppableBody = (onDragEnd) => (props) => (
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

const DraggableRow = (id, index) => (props) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <TableRow
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
          {...props}
        >
          <p {...provided.dragHandleProps}>Test</p>
          {props.children}
        </TableRow>
      )}
    </Draggable>
  )
}

const items = {
  foo: {
    foo: 'PRIMEIRO',
    bar: 'ITEM',
  },
  bar: {
    foo: 'SEGUNDO',
    bar: 'ITEM',
  },
  coo: {
    foo: 'TERCEIRO',
    bar: 'ITEM',
  },
}

const initialOrder = ['foo', 'bar', 'coo']

const KeyResultTable = (): ReactElement => {
  const [order, setOrder] = useState(initialOrder)
  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const orderedItems = reorder(order, result.source.index, result.destination.index)
    setOrder(orderedItems)
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Coluna 1</TableCell>
            <TableCell>Coluna 2</TableCell>
          </TableRow>
        </TableHead>

        <TableBody component={DroppableBody(onDragEnd)}>
          {order.map((item, index) => (
            <TableRow component={DraggableRow(item, index)} key={item}>
              <TableCell>{items[item].foo}</TableCell>
              <TableCell>{items[item].bar}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default KeyResultTable
