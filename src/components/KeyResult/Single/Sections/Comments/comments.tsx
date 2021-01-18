import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { KeyResult } from 'src/components/KeyResult/types'

import messages from './messages'

export interface KeyResultSectionCommentsProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultSectionComments = ({ keyResultID }: KeyResultSectionCommentsProperties) => {
  const intl = useIntl()

  return (
    <Flex gridGap={2} direction="column">
      <Text fontWeight={500} color="gray.600">
        {intl.formatMessage(messages.label)}
      </Text>
    </Flex>
  )
}

export default KeyResultSectionComments
