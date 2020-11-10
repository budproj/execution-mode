import { styled, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import grid from 'components/KeyResult/Table/grid'
import { KeyResult } from 'components/KeyResult/types'

import messages from './messages'

interface HeadCell {
  id: keyof KeyResult | 'icon'
  label?: string
  hidden?: boolean
}

const StyledHeadLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
}))

const StyledHeadCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `0.5px solid ${theme.palette.grey[200]}`,
}))

const StyledHiddenHeadCell = styled(TableCell)({
  borderBottom: 'none',
  width: '1%',
  padding: 0,
})

const StyledTableRow = styled(TableRow)({
  '& th:nth-child(2)': {
    paddingLeft: 0,
  },
})

const KeyResultTableHead = (): ReactElement => {
  const intl = useIntl()

  const headCells: HeadCell[] = [
    { id: 'icon', hidden: true },
    { id: 'title', label: intl.formatMessage(messages.tableHeadTitle) },
    { id: 'objective', label: intl.formatMessage(messages.tableHeadOKR) },
    { id: 'confidence', label: intl.formatMessage(messages.tableHeadStatus) },
    { id: 'progress', label: intl.formatMessage(messages.tableHeadProgress) },
    { id: 'cycle', label: intl.formatMessage(messages.tableHeadDate) },
    { id: 'owner', label: intl.formatMessage(messages.tableHeadOwner) },
  ]

  return (
    <TableHead>
      <StyledTableRow>
        {headCells.map((singleHeadCell) =>
          singleHeadCell.hidden === true ? (
            <StyledHiddenHeadCell key={singleHeadCell.id} variant="head" />
          ) : (
            <StyledHeadCell key={singleHeadCell.id} variant="head" width={grid[singleHeadCell.id]}>
              <StyledHeadLabel variant="body2">{singleHeadCell.label}</StyledHeadLabel>
            </StyledHeadCell>
          ),
        )}
      </StyledTableRow>
    </TableHead>
  )
}

export default KeyResultTableHead
