import { Box, Grid } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { GRID_TEMPLATE_COLUMN, BORDER_COLOR } from 'components/KeyResult/List/constants'

import { Title, Okr, Status, Progress, Cycle, Owner } from './Items'

export interface ListSkeletonProperties {
  amountOfLines: number
}

const ListSkeleton = ({ amountOfLines }: ListSkeletonProperties): ReactElement => (
  <Box>
    {[...new Array(amountOfLines).keys()].map((key) => (
      <Grid
        key={`skeleton-line-${key}`}
        templateColumns={GRID_TEMPLATE_COLUMN}
        borderBottom={1}
        borderStyle="solid"
        borderColor={BORDER_COLOR}
        alignItems="center"
      >
        <Title />
        <Okr />
        <Status />
        <Progress />
        <Cycle />
        <Owner />
      </Grid>
    ))}
  </Box>
)

ListSkeleton.defaultProps = {
  amountOfLines: 4,
}

export default ListSkeleton
