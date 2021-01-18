import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import messages from './messages'

export interface KeyResultSectionCommentsProperties {
  keyResultID?: KeyResult['id']
}

const reportsSelector = buildPartialSelector<KeyResult['reports']>('reports')

const KeyResultSectionComments = ({ keyResultID }: KeyResultSectionCommentsProperties) => {
  const intl = useIntl()
  const reports = useRecoilValue(reportsSelector(keyResultID))
  const reportsWithComment = reports?.filter((report) => report.comment)

  console.log(reportsWithComment)

  return (
    <Flex gridGap={2} direction="column">
      <Text fontWeight={500} color="gray.600">
        {intl.formatMessage(messages.label)}
      </Text>
    </Flex>
  )
}

export default KeyResultSectionComments
