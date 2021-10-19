import { Avatar } from '@chakra-ui/avatar'
import { ImageProps } from '@chakra-ui/image'
import { ComponentWithAs } from '@chakra-ui/system'
import React from 'react'

export const DialogImageWrapper: ComponentWithAs<'img', ImageProps> = ({ src }: ImageProps) => {
  return <Avatar src={src} size="2xl" borderWidth={4} borderColor="new-gray.500" />
}
