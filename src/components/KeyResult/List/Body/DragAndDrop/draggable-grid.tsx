import { Box, Grid, GridProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useIntl } from 'react-intl'

import ReorderIcon from 'src/components/Icon/Reorder'
import { KeyResult } from 'src/components/KeyResult/types'

import messages from './messages'

export interface DraggableGridProperties extends GridProps {
  keyResultID: KeyResult['id']
  index: number
}

const DraggableGrid = ({
  keyResultID,
  index,
  children,
  ...rest
}: DraggableGridProperties): ReactElement => {
  const intl = useIntl()

  return (
    <Draggable draggableId={`KEY_RESULT_VIEW_ROW::${keyResultID.toString()}`} index={index}>
      {(provided, { isDragging }) => (
        <Grid
          ref={provided.innerRef}
          templateColumns="0fr 1fr"
          bg={isDragging ? 'blue.50' : 'transparent'}
          alignItems="center"
          {...provided.draggableProps}
          {...rest}
        >
          <Box ml="-21px" {...provided.dragHandleProps}>
            <ReorderIcon desc={intl.formatMessage(messages.reorderIconDesc)} fill="black.300" />
          </Box>

          {children}
        </Grid>
      )}
    </Draggable>
  )
}

export default DraggableGrid
