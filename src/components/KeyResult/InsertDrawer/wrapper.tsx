import { Flex, Stack, Drawer, DrawerContent, DrawerOverlay, useToast } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import { Team } from 'src/components/Team/types'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

import { keyResultInsertDrawerObjectiveID } from '../../../state/recoil/key-result/drawers/insert/objective-id'

import { InsertKeyResultForm } from './Form/wrapper'
import { KeyResultInsertDrawerHeader } from './header'
import messages from './messages'

interface KeyResultInsertDrawerProperties {
  teamID?: Team['id'] | null
  isPersonalKR?: boolean
}

export const KeyResultInsertDrawer = ({
  teamID,
  isPersonalKR,
}: KeyResultInsertDrawerProperties) => {
  const drawerObjectiveID = useRecoilValue(keyResultInsertDrawerObjectiveID)
  const resetDrawerObjectiveID = useResetRecoilState(keyResultInsertDrawerObjectiveID)
  const { dispatch: dispatchCreatedObjective } = useEvent(EventType.CREATED_OBJECTIVE)
  const intl = useIntl()
  const toast = useToast()

  const isOpen = Boolean(drawerObjectiveID)

  const handleSuccess = (currentUserID: string) => {
    resetDrawerObjectiveID()
    toast({
      title: intl.formatMessage(messages.successToastMessage),
      status: 'success',
    })

    dispatchCreatedObjective({ isPersonal: !teamID, userId: currentUserID })
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
      <DrawerContent overflowY="auto" flexGrow={1}>
        <Stack h="full">
          <KeyResultInsertDrawerHeader />
          <Flex flexGrow={1}>
            <InsertKeyResultForm
              isPersonalKR={isPersonalKR}
              objectiveID={drawerObjectiveID}
              teamID={teamID}
              onClose={resetDrawerObjectiveID}
              onSuccess={handleSuccess}
              onError={handleError}
              onValidationError={handleValidationError}
            />
          </Flex>
        </Stack>
      </DrawerContent>
    </Drawer>
  )
}
