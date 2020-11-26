import { Flex, Text, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

import CircleIcon from 'components/Icons/Circle'
import BaseGridItem from 'components/KeyResult/View/Body/Columns/Base'
import { KeyResult, ConfidenceReport } from 'components/KeyResult/types'

import messages from './messages'

export interface StatusProperties {
  keyResult?: KeyResult
}

export interface Tag {
  message: MessageDescriptor
  desc: MessageDescriptor
  color: string
}

export const selectStatusTagBasedInConfidence = (confidence: ConfidenceReport['valueNew']): Tag => {
  if (confidence >= 50)
    return { message: messages.upToDate, desc: messages.descUpToDate, color: 'green.500' }
  if (confidence >= 25 && confidence < 50)
    return { message: messages.atRisk, desc: messages.descAtRisk, color: 'yellow.500' }
  return { message: messages.overdue, desc: messages.descOverdue, color: 'red.500' }
}

const Status = ({ keyResult }: StatusProperties): ReactElement => {
  const latestConfidenceReport = keyResult?.confidenceReports?.[0]
  const currentConfidence = latestConfidenceReport?.valueNew ?? 50
  const intl = useIntl()

  const tag = selectStatusTagBasedInConfidence(currentConfidence ?? 0)

  const isKeyResultLoaded = Boolean(keyResult)

  return (
    <BaseGridItem>
      <Flex gridGap={4}>
        <SkeletonCircle size="16px" isLoaded={isKeyResultLoaded}>
          <CircleIcon fill={tag.color} mt="6px" desc={intl.formatMessage(tag.desc)} />
        </SkeletonCircle>

        <Flex flexDirection="column" alignItems="flex-start" width="100%">
          <Skeleton isLoaded={isKeyResultLoaded}>
            <Text>{intl.formatMessage(tag.message)}</Text>
          </Skeleton>

          <SkeletonText
            noOfLines={2}
            minW="100%"
            mt={isKeyResultLoaded ? 'inherit' : '4px'}
            isLoaded={isKeyResultLoaded}
          >
            <Text color="gray.300" fontSize="14px">
              {intl.formatMessage(messages.updatedAt)} -{' '}
              {intl.formatDate(latestConfidenceReport?.createdAt, {
                day: 'numeric',
                month: 'short',
              })}
            </Text>
          </SkeletonText>
        </Flex>
      </Flex>
    </BaseGridItem>
  )
}

export default Status
