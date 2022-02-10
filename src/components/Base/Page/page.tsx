import { Flex, BoxProps } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

import MainAppBar from 'src/components/Base/MainAppBar'

import { EventType } from '../../../state/hooks/useEvent/event-type'
import { useEvent } from '../../../state/hooks/useEvent/hook'
import { MainAppBarVariant } from '../MainAppBar/main-app-bar'

export interface PageProperties extends BoxProps {
  children: ReactElement | ReactElement[]
  appBarVariant?: MainAppBarVariant
}

const Page = ({ children, appBarVariant, ...rest }: PageProperties): ReactElement => {
  const { pathname } = useRouter()
  const { dispatch } = useEvent(EventType.PAGE_VIEW)

  dispatch({ pathname })

  return (
    <Flex minH="100vh" direction="column" {...rest}>
      <MainAppBar variant={appBarVariant} />
      {children}
    </Flex>
  )
}

export default Page
