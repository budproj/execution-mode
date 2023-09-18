import { Grid } from '@chakra-ui/react'
import React from 'react'

interface TaskCardRootProperties {
  children: React.ReactNode
}

export const GRID_TEMPLATE_COLUMNS = 'repeat(2, 1fr)'

export const TaskCardRoot = ({ children }: TaskCardRootProperties) => {
  return (
    <Grid
      boxShadow="-1px 4px 28px 7px rgba(0,0,0,0.27)"
      p={3}
      templateColumns="8fr 1fr"
      gap={4}
      bgColor="#fff"
      borderRadius={10}
      w={280}
      h={200}
    >
      {children}
    </Grid>
  )
}
