import { Image, ImageProps } from '@chakra-ui/image'
import { Stack, Text } from '@chakra-ui/layout'
import { ComponentWithAs } from '@chakra-ui/system'
import React from 'react'

type HeaderProperties = {
  title?: string
  imageURL?: string
  Wrapper?: ComponentWithAs<'img', ImageProps>
}

export const Header = ({ title, imageURL, Wrapper }: HeaderProperties) => {
  Wrapper ??= Image

  return (
    <Stack alignItems="center" spacing={8} px={4}>
      <Wrapper src={imageURL} />
      <Text color="gray.500" fontSize="3xl" fontWeight={500} lineHeight={10} textAlign="center">
        {title}
      </Text>
    </Stack>
  )
}
