import { Avatar } from '@chakra-ui/react'
import { ImageProps } from '@chakra-ui/react'
import { ComponentWithAs } from '@chakra-ui/react'
import React from 'react'

export const DialogImageWrapper: ComponentWithAs<'img', ImageProps> = ({ src }: ImageProps) => {
  return <Avatar src={src} size="2xl" borderWidth={4} borderColor="new-gray.500" />
}
