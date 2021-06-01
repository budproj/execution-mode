import { Flex, Stack } from '@chakra-ui/layout'
import { Drawer, DrawerContent, DrawerOverlay, useToast } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import { keyResultInsertDrawerObjectiveID } from '../../../state/recoil/key-result/drawers/insert/objective-id'

import { InsertKeyResultForm } from './Form/wrapper'
import { KeyResultInsertDrawerHeader } from './header'
import messages from './messages'

interface KeyResultInsertDrawerProperties {
  teamID?: string
}

export const KeyResultInsertDrawer = ({ teamID }: KeyResultInsertDrawerProperties) => {
  const drawerObjectiveID = useRecoilValue(keyResultInsertDrawerObjectiveID)
  const resetDrawerObjectiveID = useResetRecoilState(keyResultInsertDrawerObjectiveID)
  const intl = useIntl()
  const toast = useToast()

  const isOpen = Boolean(drawerObjectiveID)

  const handleSuccess = () => {
    resetDrawerObjectiveID()
    toast({
      title: intl.formatMessage(messages.successToastMessage),
      status: 'success',
    })
  }

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
              onSuccess={handleSuccess}
            />
          </Flex>
        </Stack>
      </DrawerContent>
    </Drawer>
  )
}
