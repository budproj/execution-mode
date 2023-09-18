import { Grid } from '@chakra-ui/react'
import React, { useCallback } from 'react'

interface TaskCardRootProperties {
  children: React.ReactNode
  action?: () => void
  completed: boolean
}

export const GRID_TEMPLATE_COLUMNS = 'repeat(2, 1fr)'

export const TaskCardRoot = ({ children, completed, action }: TaskCardRootProperties) => {
  const handleTaskCardClick = useCallback(() => {
    if (!completed && action) action()
  }, [action, completed])

  return (
    <Grid
      boxShadow="-1px 4px 28px 7px rgba(0,0,0,0.15)"
      p={3}
      templateColumns="8fr 1fr"
      gap={4}
      bgColor="#fff"
      borderRadius={10}
      w={280}
      h={200}
      cursor={completed ? 'default' : 'pointer'}
      _hover={{
        boxShadow: completed ? 'default' : '-1px 4px 28px 7px rgba(0,0,0,0.30)',
      }}
      onClick={handleTaskCardClick}
    >
      {children}
    </Grid>
  )
}
