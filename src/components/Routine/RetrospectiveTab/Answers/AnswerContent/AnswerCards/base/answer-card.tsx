import { HStack, StyleProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { hasCallToActionOnAnswerDetails } from 'src/state/recoil/routine/has-call-to-action'

interface AnswerCardBaseProperties extends StyleProps {
  children: JSX.Element | JSX.Element[]
  isDependent?: boolean
  hasCallToAction?: boolean
}

const CustomHStack = styled(HStack)<AnswerCardBaseProperties>`
  @media (min-width: 1600px) {
    gap: 52px;
  }

  @media (max-width: 1417px) {
    gap: 38px;

    .answerTitle {
      max-width: ${(properties) => (properties.hasCallToAction ? '160px' : '220px')};
    }
  }
`

const AnswerCardBase = ({ children, isDependent = false, ...rest }: AnswerCardBaseProperties) => {
  const hasCallToAction = useRecoilValue(hasCallToActionOnAnswerDetails)

  return (
    <CustomHStack
      justifyContent={isDependent ? 'flex-end' : 'space-between'}
      alignItems="flex-start"
      pt={isDependent ? 4 : 12}
      gap={hasCallToAction ? undefined : '84px !important'}
      hasCallToAction={hasCallToAction}
      {...rest}
    >
      {children}
    </CustomHStack>
  )
}

export default AnswerCardBase
