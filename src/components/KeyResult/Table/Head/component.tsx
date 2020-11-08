import { styled, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

import { KeyResult } from 'components/KeyResult/types'

interface HeadCell {
  id: keyof KeyResult
  label: string
}

const StyledHeadLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
}))

const KeyResultTableHead = (): ReactElement => {
  const intl = useIntl()

  const headCells: HeadCell[] = [
    { id: 'title', label: intl.formatMessage(messages.tableHeadTitle) },
    { id: 'objective', label: intl.formatMessage(messages.tableHeadOKR) },
    { id: 'confidence', label: intl.formatMessage(messages.tableHeadStatus) },
    { id: 'progress', label: intl.formatMessage(messages.tableHeadProgress) },
    { id: 'cycle', label: intl.formatMessage(messages.tableHeadDate) },
    { id: 'owner', label: intl.formatMessage(messages.tableHeadOwner) },
  ]

  return (
    <TableHead>
      <TableRow>
        {headCells.map((singleHeadCell) => (
          <TableCell key={singleHeadCell.id} variant="head">
            <StyledHeadLabel variant="body2">{singleHeadCell.label}</StyledHeadLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default KeyResultTableHead
