import { Table, TableContainer } from '@material-ui/core'
import React, { ReactElement } from 'react'

import TableBody from './Body'
import TableHead from './Head'

const KeyResultsTable = (): ReactElement => (
  <TableContainer>
    <Table>
      <TableHead />
      <TableBody />
    </Table>
  </TableContainer>
)

export default KeyResultsTable
