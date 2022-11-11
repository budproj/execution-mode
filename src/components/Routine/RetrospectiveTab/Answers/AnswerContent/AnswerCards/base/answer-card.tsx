import { HStack, StyleProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

interface AnswerCardBaseProperties extends StyleProps {
  children: JSX.Element | JSX.Element[]
  isDependent?: boolean
}

const CustomHStack = styled(HStack)`
  @media (min-width: 1600px) {
    gap: 52px;
  }

  @media (max-width: 1417px) {
    gap: 18px;

    .answerTitle {
      max-width: 160px;
    }
  }
`

const AnswerCardBase = ({ children, isDependent = false, ...rest }: AnswerCardBaseProperties) => {
  return (
    <CustomHStack
      justifyContent={isDependent ? 'flex-end' : 'space-between'}
      alignItems="flex-start"
      pt={isDependent ? 4 : 12}
      {...rest}
    >
      {children}
    </CustomHStack>
  )
}

export default AnswerCardBase
