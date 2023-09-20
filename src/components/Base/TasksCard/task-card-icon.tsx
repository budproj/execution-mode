import { Box, BoxProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface TaskCardIconProperties extends BoxProps {
  children: ReactNode
}

export const TaskCardIcon = ({ children, ...rest }: TaskCardIconProperties) => {
  return <Box {...rest}>{children}</Box>
}
