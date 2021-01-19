import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import KeyResultSectionsCommentsList from './list'
import messages from './messages'
import KeyResultSectionsCommentsSkeleton from './skeleton'

export interface KeyResultSectionCommentsProperties {
  noOfSkeletons: number
  keyResultID?: KeyResult['id']
}

const reportsSelector = buildPartialSelector<KeyResult['reports']>('reports')

const KeyResultSectionComments = ({
  keyResultID,
  noOfSkeletons,
}: KeyResultSectionCommentsProperties) => {
  const intl = useIntl()
  const reports = useRecoilValue(reportsSelector(keyResultID))

  const comments = reports?.filter((report) => report.comment)
  const isLoaded = typeof comments !== 'undefined'

  return (
    <Flex gridGap={4} direction="column">
      <Text fontWeight={500} color="gray.600">
        {intl.formatMessage(messages.label)}
      </Text>

      <Flex gridGap={8} direction="column">
        {isLoaded ? (
          <KeyResultSectionsCommentsList comments={comments} />
        ) : (
          <KeyResultSectionsCommentsSkeleton noOfLines={noOfSkeletons} />
        )}
      </Flex>
    </Flex>
  )
}

KeyResultSectionComments.defaultProps = {
  noOfSkeletons: 3,
}

export default KeyResultSectionComments
