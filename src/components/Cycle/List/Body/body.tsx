import { Box, GridProps } from '@chakra-ui/react'
import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { MessageDescriptor } from 'react-intl'

import CyclesBody from 'src/components/Cycle/List/Body/Static'
import { Cycle } from 'src/components/Cycle/types'

import { CYCLE_LIST_COLUMN } from './Columns/constants'
import { CyclesListBodyColumnProperties } from './Columns/types'

export interface CyclesListBodyProperties {
  listID: string
  columns: CYCLE_LIST_COLUMN[]
  templateColumns: GridProps['templateColumns']
  columnGap: GridProps['gridColumnGap']
  borderColor: GridProps['borderColor']
  bodyProperties: CyclesListBodyColumnProperties
  emptyStateMessage?: MessageDescriptor
  cyclesIDs?: Array<Cycle['id']>
  onLineClick?: (id: Cycle['id']) => void
  handleDragEnd?: (result: DropResult) => void
}

const CyclesListBody = ({ cyclesIDs, ...rest }: CyclesListBodyProperties) => {
  return cyclesIDs ? <CyclesBody cyclesIDs={cyclesIDs} {...rest} /> : <Box />
}

export default CyclesListBody
