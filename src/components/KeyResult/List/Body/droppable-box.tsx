import { Box, BoxProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd'

export interface DroppableBoxProperties extends BoxProps {
  onDragEnd: OnDragEndResponder
}

const DroppableBox = ({ onDragEnd, children, ...rest }: DroppableBoxProperties): ReactElement => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="keyResultList" direction="vertical">
      {(provided) => (
        <Box ref={provided.innerRef} {...provided.droppableProps} {...rest}>
          {children}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  </DragDropContext>
)

export default DroppableBox
