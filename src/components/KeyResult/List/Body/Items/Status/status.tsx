import { Flex, Text, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import CircleIcon from 'components/Icons/Circle'
import BaseGridItem from 'components/KeyResult/List/Body/Items/Base'
import { KeyResult, KeyResultConfidence } from 'components/KeyResult/types'
import { keyResultConfidence } from 'state/recoil/key-results/single/confidence'

import messages from './messages'

export interface StatusProperties {
  id?: KeyResult['id']
}

export interface Tag {
  message: MessageDescriptor
  desc: MessageDescriptor
  color: string
}

export const selectStatusTagBasedInConfidence = (confidence: KeyResultConfidence['value']): Tag => {
  if (confidence >= 50)
    return { message: messages.upToDate, desc: messages.descUpToDate, color: 'green.500' }
  if (confidence >= 25 && confidence < 50)
    return { message: messages.atRisk, desc: messages.descAtRisk, color: 'yellow.500' }
  return { message: messages.overdue, desc: messages.descOverdue, color: 'red.500' }
}

const Status = ({ id }: StatusProperties): ReactElement => {
  const intl = useIntl()
  const confidence = useRecoilValue<KeyResult['confidence'] | undefined>(keyResultConfidence(id))

  const tag = selectStatusTagBasedInConfidence(confidence?.value ?? 0)

  const isConfidenceLoaded = Boolean(confidence)

  return (
    <BaseGridItem>
      <Flex gridGap={4}>
        <SkeletonCircle size="16px" isLoaded={isConfidenceLoaded}>
          <CircleIcon fill={tag.color} mt="6px" desc={intl.formatMessage(tag.desc)} />
        </SkeletonCircle>

        <Flex flexDirection="column" alignItems="flex-start" width="100%">
          <Skeleton isLoaded={isConfidenceLoaded}>
            <Text>{intl.formatMessage(tag.message)}</Text>
          </Skeleton>

          <SkeletonText
            noOfLines={2}
            minW="100%"
            mt={isConfidenceLoaded ? 'inherit' : '4px'}
            isLoaded={isConfidenceLoaded}
          >
            <Text color="gray.300" fontSize="14px">
              {intl.formatMessage(messages.updatedAt)} -{' '}
              {intl.formatDate(confidence?.createdAt, {
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
