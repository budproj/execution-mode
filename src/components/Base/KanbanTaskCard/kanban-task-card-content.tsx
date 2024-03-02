import { Text, TextProps } from '@chakra-ui/react'
import React from 'react'

interface KanbanTaskCardContentProperties extends TextProps {
  title: string
}

export const KanbanTaskCardContent = ({ title, ...rest }: KanbanTaskCardContentProperties) => {
  return (
    <Text fontSize={14} fontWeight="bold" color="new-gray.900" {...rest}>
      {title}
    </Text>
  )
}
