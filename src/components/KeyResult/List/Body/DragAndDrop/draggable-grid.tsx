import { Box, Grid, GridProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useIntl } from 'react-intl'

import ReorderIcon from 'src/components/Icons/Reorder'
import { KeyResult } from 'src/components/KeyResult/types'

import messages from './messages'

export interface DraggableGridProperties extends GridProps {
  keyResultID: KeyResult['id']
  index: number
  templateColumns: GridProps['templateColumns']
}

const DraggableGrid = ({
  keyResultID,
  index,
  children,
  templateColumns,
  ...rest
}: DraggableGridProperties): ReactElement => {
  const intl = useIntl()

  return (
    <Draggable draggableId={`KEY_RESULT_VIEW_ROW::${keyResultID.toString()}`} index={index}>
      {(provided, { isDragging }) => (
        <Grid
          ref={provided.innerRef}
          bg={isDragging ? 'blue.50' : 'transparent'}
          templateColumns={`0fr ${templateColumns as string}`}
          {...provided.draggableProps}
          {...rest}
        >
          <Box ml="-21px" {...provided.dragHandleProps}>
            <ReorderIcon desc={intl.formatMessage(messages.reorderIconDesc)} fill="gray.300" />
          </Box>

          {children}
        </Grid>
      )}
    </Draggable>
  )
}

export default DraggableGrid
