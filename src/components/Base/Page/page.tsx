import { BoxProps, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import MainAppBar from 'src/components/Base/MainAppBar'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import { EventType } from '../../../state/hooks/useEvent/event-type'
import { useEvent } from '../../../state/hooks/useEvent/hook'
import { MainAppBarVariant } from '../MainAppBar/main-app-bar'

export interface PageProperties extends BoxProps {
  children: ReactElement | ReactElement[]
  appBarVariant?: MainAppBarVariant
}

const Page = ({ children, appBarVariant, ...rest }: PageProperties): ReactElement => {
  const {
    pathname,
    query: { keyResultId },
  } = useRouter()
  const [openedKeyResultId, setOpenDrawer] = useRecoilState(keyResultReadDrawerOpenedKeyResultID)
  const { dispatch } = useEvent(EventType.PAGE_VIEW)

  dispatch({ pathname })

  const [keyResultQueryParameterFit] = Array.isArray(keyResultId) ? keyResultId : [keyResultId]

  useEffect(() => {
    setTimeout(() => {
      if (keyResultId && openedKeyResultId !== keyResultId) {
        setOpenDrawer(keyResultQueryParameterFit)
      }
    }, 1500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyResultId])

  return (
    <Flex minH="100vh" direction="column" {...rest}>
      <MainAppBar variant={appBarVariant} />
      {children}
    </Flex>
  )
}

export default Page
