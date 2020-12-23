import { Box } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { DragDropContext, Droppable, DragDropContextProps } from 'react-beautiful-dnd'

const DroppableBox = ({ onDragEnd, children, ...rest }: DragDropContextProps): ReactElement => (
  <DragDropContext onDragEnd={onDragEnd} {...rest}>
    <Droppable droppableId="KEY_RESULT_VIEW" direction="vertical">
      {(provided) => (
        <Box ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  </DragDropContext>
)

export default DroppableBox
