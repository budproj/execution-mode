import { HStack, Stack, Text, useToken } from '@chakra-ui/react'
import { ImageProps } from 'next/image'
import React, { ReactElement } from 'react'

interface TaskCardContentProperties {
  renderIcon?: () => ReactElement<ImageProps>
  title: string
  subtitle: string
  completed: boolean
}

export const TaskCardContent = ({
  renderIcon,
  completed,
  title,
  subtitle,
}: TaskCardContentProperties) => {
  const [completedTextColor, defaultTextColor] = useToken('colors', [
    'new-gray.500',
    'new-gray.800',
  ])

  const textColor = completed ? completedTextColor : defaultTextColor

  return (
    <Stack>
      <HStack>
        {renderIcon?.()}
        <Text fontSize={14} fontWeight="bold" color={textColor}>
          {title}
        </Text>
      </HStack>
      <Text fontSize={14} color={textColor}>
        {subtitle}
      </Text>
    </Stack>
  )
}
