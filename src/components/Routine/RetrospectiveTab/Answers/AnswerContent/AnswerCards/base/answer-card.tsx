import { HStack, StyleProps } from '@chakra-ui/react'
import React from 'react'

interface AnswerCardBaseProperties extends StyleProps {
  children: JSX.Element | JSX.Element[]
  isDependent?: boolean
}

const AnswerCardBase = ({ children, isDependent = false, ...rest }: AnswerCardBaseProperties) => {
  return (
    <HStack
      justifyContent={isDependent ? 'flex-end' : 'space-between'}
      alignItems="flex-start"
      maxWidth={720}
      width="100%"
      pt={isDependent ? 2 : 12}
      {...rest}
    >
      {children}
    </HStack>
  )
}

export default AnswerCardBase
