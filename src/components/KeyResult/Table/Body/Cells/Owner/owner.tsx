import React, { ReactElement } from 'react'
import { KeyResult } from 'components/KeyResult/types'

import grid from 'components/KeyResult/Table/grid'
import { TableCell } from '@material-ui/core'

export interface OwnerProps {
  id: KeyResult['id']
}

const Owner = ({ id }: OwnerProps): ReactElement => <TableCell width={grid.owner}>{id}</TableCell>

export default Owner
