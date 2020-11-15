import { Flex, Box, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import CircleIcon from 'components/Icons/Circle'
import BaseGridItem from 'components/KeyResult/List/Body/Items/Base'
import { KeyResult, KeyResultConfidence } from 'components/KeyResult/types'
import { keyResultConfidence } from 'state/recoil/key-results/single/confidence'

import messages from './messages'

export interface StatusProperties {
  id: KeyResult['id']
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

  return confidence ? (
    <BaseGridItem>
      <Flex gridGap={4}>
        <CircleIcon fill={tag.color} mt="6px" desc={intl.formatMessage(tag.desc)} />

        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Text>{intl.formatMessage(tag.message)}</Text>
          <Text color="gray.300" fontSize="14px">
            {intl.formatMessage(messages.updatedAt)} -{' '}
            {intl.formatDate(confidence.createdAt, {
              day: 'numeric',
              month: 'short',
            })}
          </Text>
        </Box>
      </Flex>
    </BaseGridItem>
  ) : (
    <>Loading</>
  )
}

export default Status
