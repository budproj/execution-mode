import React, { ReactElement } from 'react'
import { KeyResult } from 'components/KeyResult/types'

import grid from 'components/KeyResult/Table/grid'
import { TableCell } from '@material-ui/core'

export interface CycleProps {
  id: KeyResult['id']
}

const Cycle = ({ id }: CycleProps): ReactElement => <TableCell width={grid.cycle}>{id}</TableCell>

export default Cycle
