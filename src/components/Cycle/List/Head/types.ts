import { FlexboxProps } from '@chakra-ui/react'

import { CYCLE_LIST_COLUMN } from 'src/components/Cycle/List/Body/Columns/constants'

export interface HeadProperties {
  hidden?: boolean
  justifySelf?: FlexboxProps['justifySelf']
}

export interface CycleListColumnHeadProperties {
  [CYCLE_LIST_COLUMN.CYCLE]?: HeadProperties
  [CYCLE_LIST_COLUMN.ACTIONS]?: HeadProperties
  [CYCLE_LIST_COLUMN.CADENCE_LEVEL]?: HeadProperties
  [CYCLE_LIST_COLUMN.INITIAL_DATE]?: HeadProperties
  [CYCLE_LIST_COLUMN.END_DATE]?: HeadProperties
  [CYCLE_LIST_COLUMN.CYCLE]?: HeadProperties
  [CYCLE_LIST_COLUMN.STATUS]?: HeadProperties
}
