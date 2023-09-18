import { Box } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface TaskCardIconProperties {
  children: ReactNode
}

export const TaskCardIcon = ({ children }: TaskCardIconProperties) => {
  return <Box>{children}</Box>
}
