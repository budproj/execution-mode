import { NoSsr, Table, TableContainer } from '@material-ui/core'
import React, { ReactElement } from 'react'

import TableBody from './Body'
import TableHead from './Head'

const KeyResultsTable = (): ReactElement => (
  <TableContainer>
    <Table>
      <TableHead />
      <NoSsr>
        <TableBody />
      </NoSsr>
    </Table>
  </TableContainer>
)

export default KeyResultsTable
