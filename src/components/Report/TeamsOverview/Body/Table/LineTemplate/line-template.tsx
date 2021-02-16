import { Grid, GridProps } from '@chakra-ui/react'
import React from 'react'

import { BORDER_COLOR, BORDER_WIDTH, PADDING } from 'src/components/Report/Overview/constants'

import { TABLE_GRID_COLUMNS } from './constants'

const TeamsOverviewBodyTableLineTemplate = ({ children, ...rest }: GridProps) => (
  <Grid
    templateColumns={TABLE_GRID_COLUMNS}
    gridGap={8}
    px={PADDING}
    py={4}
    borderBottomWidth={BORDER_WIDTH}
    borderColor={BORDER_COLOR}
    {...rest}
  >
    {children}
  </Grid>
)

export default TeamsOverviewBodyTableLineTemplate
