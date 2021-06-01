import { Flex, Stack } from '@chakra-ui/layout'
import { Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import { keyResultInsertDrawerObjectiveID } from '../../../state/recoil/key-result/drawers/insert/objective-id'

import { InsertKeyResultForm } from './Form/wrapper'
import { KeyResultInsertDrawerHeader } from './header'

interface KeyResultInsertDrawerProperties {
  teamID?: string
}

export const KeyResultInsertDrawer = ({ teamID }: KeyResultInsertDrawerProperties) => {
  const drawerObjectiveID = useRecoilValue(keyResultInsertDrawerObjectiveID)
  const resetDrawerObjectiveID = useResetRecoilState(keyResultInsertDrawerObjectiveID)

  const isOpen = Boolean(drawerObjectiveID)

  return (
    <Drawer isOpen={isOpen} size="xl" placement="right" onClose={resetDrawerObjectiveID}>
      <DrawerOverlay />
      <DrawerContent>
        <Stack flexGrow={1}>
          <KeyResultInsertDrawerHeader />
          <Flex flexGrow={1}>
            <InsertKeyResultForm
              objectiveID={drawerObjectiveID}
              teamID={teamID}
              onClose={resetDrawerObjectiveID}
            />
          </Flex>
        </Stack>
      </DrawerContent>
    </Drawer>
  )
}
