import { styled, TableCell, TableCellProps } from '@material-ui/core'
import React, { ReactElement } from 'react'

const StyledCell = styled(TableCell)(({ theme }) => ({
  padding: '16px 0',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}))

const Base = (props: TableCellProps): ReactElement => <StyledCell {...props} />

export default Base
