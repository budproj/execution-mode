import { Image, ImageProps, Stack, Text, ComponentWithAs } from '@chakra-ui/react'
import React from 'react'

type HeaderProperties = {
  title?: string | React.ReactNode
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
