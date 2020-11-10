import { TableBody, TableRow, TableCell, styled } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React, { ReactElement } from 'react'

import { Skeleton as CycleSkeleton } from './Cells/Cycle'
import { Skeleton as OkrSkeleton } from './Cells/Okr'
import { Skeleton as ProgressSkeleton } from './Cells/Progress'
import { Skeleton as StatusSkeleton } from './Cells/Status'
import { Skeleton as TitleSkeleton } from './Cells/Title'

export interface TableSkeletonProps {
  amountOfRows: number
}

export const StyledSkeletonCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}))

const StyledHiddenCell = styled(TableCell)({
  borderBottom: 'none',
})

const TableSkeleton = (props: TableSkeletonProps): ReactElement => (
  <TableBody>
    {[...new Array(props.amountOfRows).keys()].map((key) => (
      <TableRow key={`skeleton-row-${key}`}>
        <StyledHiddenCell />

        <TitleSkeleton />
        <OkrSkeleton />
        <StatusSkeleton />
        <ProgressSkeleton />
        <CycleSkeleton />

        <StyledSkeletonCell>
          <Skeleton variant="circle" width={40} height={40} />
        </StyledSkeletonCell>
      </TableRow>
    ))}
  </TableBody>
)

TableSkeleton.defaultProps = {
  amountOfRows: 5,
}

export default TableSkeleton
