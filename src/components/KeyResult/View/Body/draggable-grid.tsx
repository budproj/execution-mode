import { Box, Grid, GridProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useIntl } from 'react-intl'

import ReorderIcon from 'components/Icons/Reorder'
import { KeyResult } from 'components/KeyResult/types'

import messages from './messages'

export interface DraggableGridProperties extends GridProps {
  id: KeyResult['id']
  index: number
}

const DraggableGrid = ({ id, index, children, ...rest }: DraggableGridProperties): ReactElement => {
  const intl = useIntl()

  return (
    <Draggable draggableId={`KEY_RESULT_VIEW_ROW::${id}`} index={index}>
      {(provided, { isDragging }) => (
        <Grid
          ref={provided.innerRef}
          bg={isDragging ? 'blue.50' : 'transparent'}
          {...provided.draggableProps}
          {...rest}
        >
          <Box position="absolute" ml="-21px" {...provided.dragHandleProps}>
            <ReorderIcon desc={intl.formatMessage(messages.reorderIconDesc)} fill="gray.300" />
          </Box>

          {children}
        </Grid>
      )}
    </Draggable>
  )
}

export default DraggableGrid
