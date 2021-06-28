import { Flex } from '@chakra-ui/layout'
import { BoxProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import MainAppBar from 'src/components/Base/MainAppBar'

import { useAmplitude } from '../../../state/hooks/useAmplitude/hook'
import { MainAppBarVariant } from '../MainAppBar/main-app-bar'

export interface PageProperties extends BoxProps {
  children: ReactElement | ReactElement[]
  appBarVariant?: MainAppBarVariant
}

const Page = ({ children, appBarVariant, ...rest }: PageProperties): ReactElement => {
  const amplitude = useAmplitude()
  console.log(amplitude, 'tag')

  return (
    <Flex minH="100vh" direction="column" {...rest}>
      <MainAppBar variant={appBarVariant} />
      {children}
    </Flex>
  )
}

export default Page
