import { FlexboxProps } from '@chakra-ui/react'

import { KEY_RESULT_LIST_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'

export interface HeadProperties {
  hidden?: boolean
  justifySelf?: FlexboxProps['justifySelf']
}

export interface KeyResultListColumnHeadProperties {
  [KEY_RESULT_LIST_COLUMN.KEY_RESULT]?: HeadProperties
  [KEY_RESULT_LIST_COLUMN.OBJECTIVE]?: HeadProperties
  [KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL]?: HeadProperties
  [KEY_RESULT_LIST_COLUMN.PROGRESS]?: HeadProperties
  [KEY_RESULT_LIST_COLUMN.CYCLE]?: HeadProperties
  [KEY_RESULT_LIST_COLUMN.OWNER]?: HeadProperties
  [KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL_COLOR]?: HeadProperties
}
