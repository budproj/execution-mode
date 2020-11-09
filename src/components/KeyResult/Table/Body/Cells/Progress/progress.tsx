import React, { ReactElement } from 'react'
import { KeyResult } from 'components/KeyResult/types'

import grid from 'components/KeyResult/Table/grid'
import { TableCell } from '@material-ui/core'

export interface ProgressProps {
  id: KeyResult['id']
}

const Progress = ({ id }: ProgressProps): ReactElement => (
  <TableCell width={grid.progress}>{id}</TableCell>
)

export default Progress
