import { Flex, Text, Skeleton, SkeletonText } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import ConfidenceTag from 'components/KeyResult/ConfidenceTag/confidence-tag'
import BaseGridItem from 'components/KeyResult/View/Body/Columns/Base'
import { KeyResult } from 'components/KeyResult/types'
import { buildPartialSelector } from 'state/recoil/key-result'

import messages from './messages'

export interface StatusProperties {
  id?: KeyResult['id']
}

const confidenceReportsSelector = buildPartialSelector<KeyResult['confidenceReports']>(
  'confidenceReports',
)

const Status = ({ id }: StatusProperties): ReactElement => {
  const intl = useIntl()
  const latestConfidenceReport = useRecoilValue(confidenceReportsSelector(id))?.[0]
  const updateDate = latestConfidenceReport?.createdAt
  const currentConfidence = latestConfidenceReport?.valueNew ?? 50

  const isKeyResultLoaded = Boolean(id)

  return (
    <BaseGridItem>
      <Flex gridGap={2} flexDir="column">
        <Skeleton
          isLoaded={isKeyResultLoaded}
          fadeDuration={0}
          /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
        >
          <ConfidenceTag confidence={currentConfidence} />
        </Skeleton>

        <SkeletonText
          noOfLines={2}
          minW="100%"
          mt={isKeyResultLoaded ? 'inherit' : '4px'}
          isLoaded={isKeyResultLoaded}
          pl={8}
        >
          <Text color="gray.300" fontSize="14px">
            {intl.formatMessage(messages.updatedAt)} -{' '}
            {intl.formatDate(updateDate, {
              day: 'numeric',
              month: 'short',
            })}
          </Text>
        </SkeletonText>
      </Flex>
    </BaseGridItem>
  )
}

export default Status
