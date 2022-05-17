import { Box, GridProps } from '@chakra-ui/react'
import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { MessageDescriptor } from 'react-intl'

import CyclesBodyStatic from 'src/components/Cycle/List/Body/Static'
import { CYCLE_LIST_TYPE } from 'src/components/Cycle/List/constants'
import { Cycle } from 'src/components/Cycle/types'

import { CYCLE_LIST_COLUMN } from './Columns/constants'
import { CyclesListBodyColumnProperties } from './Columns/types'

export interface CyclesListBodyProperties {
  type: CYCLE_LIST_TYPE
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

// TODO: tirar o array default de **cyclesIDs**
const CyclesListBody = ({ type, cyclesIDs = ['1'], ...rest }: CyclesListBodyProperties) => {
  const BodyComponent = CyclesBodyStatic

  // Return cyclesIDs && <BodyComponent cyclesIDs={cyclesIDs} type={type} {...rest} />
  return cyclesIDs && cyclesIDs.length > 0 ? (
    <BodyComponent cyclesIDs={cyclesIDs} type={type} {...rest} />
  ) : (
    <Box />
  )
}

export default CyclesListBody
