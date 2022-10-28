import { Grid, GridProps } from '@chakra-ui/react'
import React from 'react'

import { BORDER_COLOR, BORDER_WIDTH } from 'src/components/Report/Overview/constants'

import { TABLE_GRID_COLUMNS } from './constants'

const TeamsOverviewBodyTableLineTemplate = ({ children, ...rest }: GridProps) => (
  <Grid
    templateColumns={TABLE_GRID_COLUMNS}
    gridGap={8}
    py={4}
    borderBottomWidth={BORDER_WIDTH}
    borderColor={BORDER_COLOR}
    alignItems="center"
    {...rest}
  >
    {children}
  </Grid>
)

export default TeamsOverviewBodyTableLineTemplate
