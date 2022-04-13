import { Flex, StyleProps, Text } from '@chakra-ui/react'
import React from 'react'

interface BoardProperties extends StyleProps {
  title: string
  number: string | number
  bg?: string
  color?: string
  uppercase?: boolean
  size?: 'lg' | 'md'
}

const Board = ({
  number,
  title,
  bg = 'white',
  color,
  uppercase = false,
  size = 'md',
  ...rest
}: BoardProperties) => {
  const sizes = new Map([
    ['lg', { title: '1rem', number: '3.75rem' }],
    ['md', { title: '0.875rem', number: '2.25rem' }],
  ])

  const fontSizeInfo = sizes.get(size)

  return (
    <Flex
      borderRadius={9}
      flexDir="column"
      textAlign="center"
      justifyContent="center"
      bg={bg}
      shadow="for-background.light"
      paddingY="18"
      {...rest}
    >
      <Text
        textTransform={uppercase ? 'uppercase' : 'initial'}
        fontSize={fontSizeInfo?.title}
        fontWeight="bold"
        letterSpacing="0.01em"
        color={color ?? 'new-gray.800'}
      >
        {title}
      </Text>
      <Text
        textTransform={uppercase ? 'uppercase' : 'initial'}
        fontSize={fontSizeInfo?.number}
        lineHeight="1"
        fontWeight={600}
        color={color ?? 'brand.500'}
      >
        {number}
      </Text>
    </Flex>
  )
}

export default Board
