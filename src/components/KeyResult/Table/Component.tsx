import {
  styled,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@material-ui/core'
import React, { ReactElement } from 'react'
// import { DropResult } from 'react-beautiful-dnd'
import { useIntl } from 'react-intl'

import messages from './messages'

import { KeyResult } from 'components/KeyResult/types'
import logger from 'lib/logger'
import { useKeyResults } from 'state/hooks'

interface HeadCell {
  id: keyof KeyResult
  label: string
}

const StyledHeadLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
}))

const KeyResultsTable = (): ReactElement => {
  const intl = useIntl()
  const keyResults = useKeyResults()
  logger.debug('Rerendered component. Take a look at the keyResults hook data:', {
    data: keyResults,
    component: 'KeyResultsTable',
  })

  const headCells: HeadCell[] = [
    { id: 'title', label: intl.formatMessage(messages.tableHeadTitle) },
    { id: 'objective', label: intl.formatMessage(messages.tableHeadOKR) },
    { id: 'confidence', label: intl.formatMessage(messages.tableHeadStatus) },
    { id: 'progress', label: intl.formatMessage(messages.tableHeadProgress) },
    { id: 'date', label: intl.formatMessage(messages.tableHeadDate) },
    { id: 'owner', label: intl.formatMessage(messages.tableHeadOwner) },
  ]

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
          <TableRow>
            {headCells.map((singleHeadCell) => (
              <TableCell variant={'head'} key={singleHeadCell.id}>
                <TableSortLabel active={true}>
                  <StyledHeadLabel variant={'body2'}>{singleHeadCell.label}</StyledHeadLabel>
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  )
}

export default KeyResultsTable
