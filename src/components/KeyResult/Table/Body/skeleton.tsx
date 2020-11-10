import { TableBody, TableRow, TableCell, styled, Box } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React, { ReactElement } from 'react'

export interface TableSkeletonProps {
  amountOfRows: number
}

const StyledCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}))

const StyledHiddenCell = styled(TableCell)({
  borderBottom: 'none',
})

const StyledSkeletonIcon = styled(Skeleton)({
  borderRadius: 10,
})

const TableSkeleton = (props: TableSkeletonProps): ReactElement => (
  <TableBody>
    {[...new Array(props.amountOfRows).keys()].map((key) => (
      <TableRow key={`skeleton-row-${key}`}>
        <StyledHiddenCell />
        <StyledCell>
          <Box display="flex" alignItems="center" gridGap={20}>
            <StyledSkeletonIcon variant="rect" width={55} height={55} />
            <Box width="70%">
              <Skeleton />
              <Skeleton width="50%" />
            </Box>
          </Box>
        </StyledCell>

        <StyledCell>
          <Box display="flex" alignItems="center" gridGap={20}>
            <StyledSkeletonIcon variant="rect" width={55} height={55} />
            <Skeleton width="50%" />
          </Box>
        </StyledCell>

        <StyledCell>
          <Box display="flex" alignItems="flex-start" gridGap={10}>
            <Skeleton variant="circle" width={15} height={15} style={{ marginTop: 3 }} />
            <Box display="flex" alignItems="flex-start" width="100%" flexDirection="column">
              <Skeleton width="40%" />
              <Skeleton width="80%" />
            </Box>
          </Box>
        </StyledCell>

        <StyledCell>
          <Box display="flex" gridGap={20}>
            <Skeleton width="70%" />
            <Skeleton width="10%" />
          </Box>
        </StyledCell>

        <StyledCell>
          <Box display="flex" gridGap={20}>
            <Skeleton width="20%" />
            <Skeleton width="20%" />
          </Box>
        </StyledCell>

        <StyledCell>
          <Skeleton variant="circle" width={40} height={40} />
        </StyledCell>
      </TableRow>
    ))}
  </TableBody>
)

TableSkeleton.defaultProps = {
  amountOfRows: 5,
}

export default TableSkeleton
