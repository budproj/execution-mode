import { Table, TableCell, TableContainer, TableHead } from '@material-ui/core'
import React, { ReactElement } from 'react'
// import { DropResult } from 'react-beautiful-dnd'
import { useIntl } from 'react-intl'

import messages from './messages'

import { useKeyResults } from 'state/hooks'

const KeyResultsTable = (): ReactElement => {
  const intl = useIntl()
  const keyResults = useKeyResults()

  console.log(keyResults)

  // const onDragEnd = ({ source, destination }: DropResult): void => {
  //   if (destination && destination.index !== source.index) {
  //     const movedKeyResults = keyResults.reorderSingle(source.index, destination.index)
  //
  //     setKeyResults(movedKeyResults)
  //   }
  // }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCell>{intl.formatMessage(messages.tableHeadTitle)}</TableCell>
          <TableCell>{intl.formatMessage(messages.tableHeadOKR)}</TableCell>
          <TableCell>{intl.formatMessage(messages.tableHeadStatus)}</TableCell>
          <TableCell>{intl.formatMessage(messages.tableHeadProgress)}</TableCell>
          <TableCell>{intl.formatMessage(messages.tableHeadDate)}</TableCell>
          <TableCell>{intl.formatMessage(messages.tableHeadOwner)}</TableCell>
        </TableHead>
      </Table>
    </TableContainer>
  )
}

export default KeyResultsTable
