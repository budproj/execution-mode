import { Button, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import PlusOutlineIcon from 'src/components/Icon/PlusOutline'

import messages from './messages'

export interface CheckInFormFieldCommentButtonProperties {
  onClick?: () => void
}

const CheckInFormFieldCommentButton = ({ onClick }: CheckInFormFieldCommentButtonProperties) => {
  const intl = useIntl()

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
      onClick={onClick}
    >
      <Text color="brand.400" fontWeight={400}>
        {intl.formatMessage(messages.buttonLabel)}
      </Text>
    </Button>
  )
}

export default CheckInFormFieldCommentButton
