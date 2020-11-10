import { TableCell } from '@material-ui/core'
import React, { ReactElement } from 'react'

import grid from 'components/KeyResult/Table/grid'
import { KeyResult } from 'components/KeyResult/types'

export interface OwnerProps {
  id: KeyResult['id']
}

const Owner = ({ id }: OwnerProps): ReactElement => <TableCell width={grid.owner}>{id}</TableCell>

export default Owner
