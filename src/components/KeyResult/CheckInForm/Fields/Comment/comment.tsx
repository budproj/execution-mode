import { Button, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import PlusOutlineIcon from 'src/components/Icon/PlusOutline'

import messages from './messages'

const CheckInFormFieldComment = () => {
  const intl = useIntl()

  return (
    <Button
      alignSelf="flex-start"
      p={0}
      leftIcon={
        <PlusOutlineIcon
          desc={intl.formatMessage(messages.labelIconDesc)}
          title={intl.formatMessage(messages.labelIconTitle)}
          fill="brand.500"
          stroke="brand.500"
          w="18px"
          height="18px"
        />
      }
    >
      <Text color="brand.400" fontWeight={400}>
        {intl.formatMessage(messages.label)}
      </Text>
    </Button>
  )
}

export default CheckInFormFieldComment
