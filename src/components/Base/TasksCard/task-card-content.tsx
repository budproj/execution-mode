import { HStack, Stack, Text } from '@chakra-ui/react'
import { ImageProps } from 'next/image'
import React, { ReactElement } from 'react'

interface TaskCardContentProperties {
  renderIcon?: () => ReactElement<ImageProps>
  title: string
  subtitle: string
}

export const TaskCardContent = ({ renderIcon, title, subtitle }: TaskCardContentProperties) => {
  return (
    <Stack>
      <HStack>
        {renderIcon?.()}
        <Text fontSize={14} fontWeight="bold" color="new-gray.800">
          {title}
        </Text>
      </HStack>
      <Text fontSize={14} color="new-gray.800">
        {subtitle}
      </Text>
    </Stack>
  )
}
