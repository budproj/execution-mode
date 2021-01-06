import { Button, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import PlusOutlineIcon from 'src/components/Icon/PlusOutline'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultCheckInCommentEnabled } from 'src/state/recoil/key-result/check-in'

import messages from './messages'

export interface CheckInFormFieldCommentEnableButtonProperties {
  keyResultID?: KeyResult['id']
}

const CheckInFormFieldCommentEnableButton = ({
  keyResultID,
}: CheckInFormFieldCommentEnableButtonProperties) => {
  const intl = useIntl()
  const setCommentEnabled = useSetRecoilState(keyResultCheckInCommentEnabled(keyResultID))

  const enableComment = () => setCommentEnabled(true)

  return (
    <Button
      alignSelf="flex-start"
      p={0}
      leftIcon={
        <PlusOutlineIcon
          desc={intl.formatMessage(messages.buttonIconDesc)}
          title={intl.formatMessage(messages.buttonIconTitle)}
          fill="brand.500"
          stroke="brand.500"
          w="18px"
          height="18px"
        />
      }
      onClick={enableComment}
    >
      <Text color="brand.400" fontWeight={400}>
        {intl.formatMessage(messages.buttonLabel)}
      </Text>
    </Button>
  )
}

export default CheckInFormFieldCommentEnableButton
