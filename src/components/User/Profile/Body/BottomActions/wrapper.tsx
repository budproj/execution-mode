import { Button } from '@chakra-ui/button'
import { Stack } from '@chakra-ui/layout'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { userAtomFamily } from 'src/state/recoil/user'

import messages from './messages'

type BottomActionsProperties = {
  userID?: string
}

export const BottomActions = ({ userID }: BottomActionsProperties) => {
  const intl = useIntl()
  const user = useRecoilValue(userAtomFamily(userID))

  return (
    <Stack flexGrow={1} justifyContent="flex-end">
      <Button variant="solid" colorScheme="red">
        {intl.formatMessage(messages.deactivateUserButtonLabel, {
          gender: user?.gender,
        })}
      </Button>
    </Stack>
  )
}
