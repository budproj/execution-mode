import { Flex, StyleProps, Text, useToken } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

import { Confidence } from '../types'

const StyledFlex = styled(Flex)`
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ bgHover }) => bgHover}};
  }
`

interface BoardProperties extends StyleProps {
  title: string
  bgHover: string
  number?: string | number
  uppercase?: boolean
  size?: 'lg' | 'md'
  isLoading?: boolean
  confidence?: Confidence
  onClick?: () => void
}

const Board = ({
  number,
  title,
  bgHover = 'white',
  color,
  uppercase = false,
  size = 'md',
  isLoading,
  confidence,
  ...rest
}: BoardProperties) => {
  const sizes = new Map([
    ['lg', { title: '1rem', number: '3.75rem' }],
    ['md', { title: '0.875rem', number: '2.25rem' }],
  ])

  const [bgHoverColor]: string[] = useToken('colors', [bgHover])
  const fontSizeInfo = sizes.get(size)

  return (
    <StyledFlex
      id={confidence?.name === 'medium' ? 'medium-confidence-krs-card' : undefined}
      borderRadius={9}
      flexDir="column"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      bgHover={bgHoverColor}
      paddingY="18"
      minHeight="100%"
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
        {...(isLoading ? { opacity: 0.2 } : {})}
      >
        {isLoading ? '-' : number}
      </Text>
    </StyledFlex>
  )
}

export default Board
