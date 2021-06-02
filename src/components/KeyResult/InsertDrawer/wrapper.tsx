import { Flex, Stack } from '@chakra-ui/layout'
import { Drawer, DrawerContent, DrawerOverlay, useToast } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import PerfectScrollbar from 'react-perfect-scrollbar'
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

  const handleError = () => {
    toast({
      title: intl.formatMessage(messages.unexpectedErrorToastMessage),
      status: 'error',
    })
  }

  const handleValidationError = () => {
    toast({
      title: intl.formatMessage(messages.validationErrorToastMessage),
      status: 'error',
    })
  }

  return (
    <Drawer isOpen={isOpen} size="xl" placement="right" onClose={resetDrawerObjectiveID}>
      <DrawerOverlay />
      <DrawerContent overflowY="auto">
        <PerfectScrollbar style={{ flexGrow: 1 }}>
          <Stack h="full">
            <KeyResultInsertDrawerHeader />
            <Flex flexGrow={1}>
              <InsertKeyResultForm
                objectiveID={drawerObjectiveID}
                teamID={teamID}
                onClose={resetDrawerObjectiveID}
                onSuccess={handleSuccess}
                onError={handleError}
                onValidationError={handleValidationError}
              />
            </Flex>
          </Stack>
        </PerfectScrollbar>
      </DrawerContent>
    </Drawer>
  )
}
