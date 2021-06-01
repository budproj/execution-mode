import { Flex, Stack } from '@chakra-ui/layout'
import { Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import { keyResultInsertDrawerIsOpen } from '../../../state/recoil/key-result/drawers/insert/is-open'

import { KeyResultInsertDrawerWrapper } from './Form/wrapper'
import { KeyResultInsertDrawerHeader } from './header'

export const KeyResultInsertDrawer = () => {
  const isOpen = useRecoilValue(keyResultInsertDrawerIsOpen)
  const resetIsOpen = useResetRecoilState(keyResultInsertDrawerIsOpen)

  return (
    <Drawer isOpen={isOpen} size="xl" placement="right" onClose={resetIsOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <Stack flexGrow={1}>
          <KeyResultInsertDrawerHeader />
          <Flex flexGrow={1}>
            <KeyResultInsertDrawerWrapper onClose={resetIsOpen} />
          </Flex>
        </Stack>
      </DrawerContent>
    </Drawer>
  )
}
