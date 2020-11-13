import { TableBody, TableRow, TableCell, styled, Theme } from '@material-ui/core'
import React, { ReactElement } from 'react'

import { Skeleton as CycleSkeleton } from './Cells/Cycle'
import { Skeleton as OkrSkeleton } from './Cells/Okr'
import { Skeleton as OwnerSkeleton } from './Cells/Owner'
import { Skeleton as ProgressSkeleton } from './Cells/Progress'
import { Skeleton as StatusSkeleton } from './Cells/Status'
import { Skeleton as TitleSkeleton } from './Cells/Title'

export interface TableSkeletonProperties {
  amountOfRows: number
}

export const styledSkeletonCellStyles = (theme: Theme) => ({
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
})

export const StyledSkeletonCell = styled(TableCell)(({ theme }) => styledSkeletonCellStyles(theme))

const StyledHiddenCell = styled(TableCell)({
  borderBottom: 'none',
  padding: '0px 22px 0px 0px',
})

const TableSkeleton = (properties: TableSkeletonProperties): ReactElement => (
  <TableBody>
    {[...new Array(properties.amountOfRows).keys()].map((key) => (
      <TableRow key={`skeleton-row-${key}`}>
        <StyledHiddenCell />

        <TitleSkeleton />
        <OkrSkeleton />
        <StatusSkeleton />
        <ProgressSkeleton />
        <CycleSkeleton />
        <OwnerSkeleton />
      </TableRow>
    ))}
  </TableBody>
)

TableSkeleton.defaultProps = {
  amountOfRows: 5,
}

export default TableSkeleton
