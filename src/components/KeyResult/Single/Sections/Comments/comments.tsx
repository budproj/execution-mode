import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import KeyResultSectionCommentsComment from './Comment'
import messages from './messages'

export interface KeyResultSectionCommentsProperties {
  keyResultID?: KeyResult['id']
}

const reportsSelector = buildPartialSelector<KeyResult['reports']>('reports')

const KeyResultSectionComments = ({ keyResultID }: KeyResultSectionCommentsProperties) => {
  const intl = useIntl()
  const reports = useRecoilValue(reportsSelector(keyResultID))
  const comments = reports?.filter((report) => report.comment)

  return (
    <Flex gridGap={4} direction="column">
      <Text fontWeight={500} color="gray.600">
        {intl.formatMessage(messages.label)}
      </Text>

      <Flex gridGap={8} direction="column">
        {comments?.map(({ user, createdAt, comment }) => (
          <KeyResultSectionCommentsComment user={user} createdAt={createdAt} comment={comment} />
        ))}
      </Flex>
    </Flex>
  )
}

export default KeyResultSectionComments
