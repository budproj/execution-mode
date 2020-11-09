import { makeStyles, styled, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

import { KeyResult } from 'components/KeyResult/types'

interface HeadCell {
  id: keyof KeyResult | 'icon'
  label?: string
  hidden?: boolean
}

const StyledHeadLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
}))

const StyledHeadCell = styled(TableCell)(({ theme }) => ({
  padding: '16px 0',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}))

const StyledHiddenHeadCell = styled(TableCell)({
  borderBottom: 'none',
  padding: 0,
  width: 30,
})

const StyledTableRow = styled(TableRow)({
  '& th:nth-child(3)': {
    paddingLeft: 13,
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
            <StyledHeadCell key={singleHeadCell.id} variant="head">
              <StyledHeadLabel variant="body2">{singleHeadCell.label}</StyledHeadLabel>
            </StyledHeadCell>
          ),
        )}
      </StyledTableRow>
    </TableHead>
  )
}

export default KeyResultTableHead
