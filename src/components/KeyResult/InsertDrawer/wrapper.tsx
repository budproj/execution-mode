import { useLazyQuery } from '@apollo/client'
import { Flex, Stack, Drawer, DrawerContent, DrawerOverlay, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import GET_KEY_RESULT_WITH_ID from 'src/components/KeyResult/Single/Drawer/queries.gql'
import { Team } from 'src/components/Team/types'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import editingKeyResultAtom from 'src/state/recoil/key-result/drawers/update/editing-key-result-atom'

import { keyResultInsertDrawerObjectiveID } from '../../../state/recoil/key-result/drawers/insert/objective-id'
import { GetKeyResultWithIDQuery } from '../Single/Drawer/content'
import useGetKeyResultWithId from '../Single/Drawer/hooks/get-key-result-with-id'

import { InsertOrUpdateKeyResultForm } from './Form/wrapper'
import { KeyResultInsertOrUpdateDrawerHeader } from './header'
import messages from './messages'

interface KeyResultInsertDrawerProperties {
  teamID?: Team['id'] | null
  isPersonalKR?: boolean
}

export const KeyResultInsertDrawer = ({
  teamID,
  isPersonalKR,
}: KeyResultInsertDrawerProperties) => {
  const [isKeyResultEditingLoading, setIsKeyResultEditingLoading] = useState(false)
  const drawerObjectiveID = useRecoilValue(keyResultInsertDrawerObjectiveID)
  const editingModeKeyResultID = useRecoilValue(editingKeyResultAtom)

  const { refetch } = useGetKeyResultWithId(editingModeKeyResultID)

  const resetDrawerObjectiveID = useResetRecoilState(keyResultInsertDrawerObjectiveID)
  const resetEditingModeKeyResultID = useResetRecoilState(editingKeyResultAtom)
  const { dispatch: dispatchCreateKeyResult } = useEvent(EventType.CREATED_KEY_RESULT)
  const intl = useIntl()
  const toast = useToast()

  const [getKeyResultData, { data: keyResultData }] = useLazyQuery<GetKeyResultWithIDQuery>(
    GET_KEY_RESULT_WITH_ID,
    {
      variables: {
        id: editingModeKeyResultID,
      },
      fetchPolicy: 'network-only',
      onCompleted: () => setIsKeyResultEditingLoading(false),
    },
  )

  useEffect(() => {
    if (editingModeKeyResultID) {
      setIsKeyResultEditingLoading(true)
      getKeyResultData()
    }
  }, [editingModeKeyResultID, getKeyResultData])

  const isOpen = editingModeKeyResultID
    ? Boolean(editingModeKeyResultID)
    : Boolean(drawerObjectiveID)

  const handleResetDrawerState = async () => {
    if (editingModeKeyResultID) {
      await refetch({ id: editingModeKeyResultID })
      resetEditingModeKeyResultID()
    } else {
      resetDrawerObjectiveID()
    }
  }

  const handleSuccess = (currentUserID: string) => {
    handleResetDrawerState()
    toast({
      title: intl.formatMessage(messages.successToastMessage, {
        isEditing: Boolean(editingModeKeyResultID),
      }),
      status: 'success',
    })

    dispatchCreateKeyResult({ isPersonal: !teamID, userId: currentUserID })
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

  const isEditing = Boolean(editingModeKeyResultID)

  return (
    <Drawer isOpen={isOpen} size="xl" placement="right" onClose={handleResetDrawerState}>
      <DrawerOverlay />
      <DrawerContent overflowY="auto" flexGrow={1}>
        <Stack h="full">
          <KeyResultInsertOrUpdateDrawerHeader isEditing={isEditing} />
          <Flex flexGrow={1}>
            <InsertOrUpdateKeyResultForm
              isPersonalKR={isPersonalKR}
              objectiveID={drawerObjectiveID}
              teamID={teamID}
              editingModeKeyResult={keyResultData?.keyResult}
              isLoading={isKeyResultEditingLoading}
              onClose={handleResetDrawerState}
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
