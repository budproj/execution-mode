import { Divider, HStack, Skeleton, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { KeyResultUpdates } from 'src/components/KeyResult/types'
import selectUser from 'src/state/recoil/user/selector'

import KeyResultSectionTimelineLine from './line'

export interface KeyResultSectionTimelineCardUpdateProperties {
  data?: Partial<KeyResultUpdates>
}

const KeyResultSectionTimelineCardUpdate = ({
  data,
}: KeyResultSectionTimelineCardUpdateProperties) => {
  const intl = useIntl()
  const user = useRecoilValue(selectUser(data?.author?.identifier))

  const timestampConverted = data?.createdAt ? new Date(data.createdAt) : new Date()

  const formattedDate = intl.formatDate(timestampConverted, {
    month: 'short',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
  })

  const isLoaded = Boolean(data)

  return (
    <Skeleton isLoaded={isLoaded}>
      {data?.patches && (
        <VStack gap={3}>
          {data.patches.map((patche) => (
            <HStack key={patche.key} gap={2} w="100%">
              <Divider />
              <VStack>
                <KeyResultSectionTimelineLine patche={patche} userName={user?.fullName} />
                <Text
                  lineHeight={1}
                  fontSize={12}
                  color="new-gray.700"
                  noOfLines={1}
                  w="max-content"
                >
                  {formattedDate}
                </Text>
              </VStack>
              <Divider />
            </HStack>
          ))}
        </VStack>
      )}
    </Skeleton>
  )
}

export default KeyResultSectionTimelineCardUpdate
