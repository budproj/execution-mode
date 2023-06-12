import { Divider, HStack, Skeleton, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { KEY_RESULT_PATCHS_KEYS } from 'src/components/KeyResult/constants'
import { KeyResultUpdates } from 'src/components/KeyResult/types'
import selectUser from 'src/state/recoil/user/selector'

import messages from './messages'

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
        <HStack gap={2}>
          <Divider />
          <VStack>
            <Text
              lineHeight="14px"
              noOfLines={1}
              w="max-content"
              fontWeight={data.patches[0].key === KEY_RESULT_PATCHS_KEYS.MODE ? 'bold' : 'normal'}
              color={
                data.patches[0].key === KEY_RESULT_PATCHS_KEYS.MODE ? 'brand.500' : 'new-gray.900'
              }
              fontSize={14}
            >
              {data.patches[0].key === KEY_RESULT_PATCHS_KEYS.MODE
                ? intl.formatMessage(messages.updateKrModeCard)
                : intl.formatMessage(messages.updatedDataCard, {
                    user: user?.fullName,
                    key: data.patches[0].key,
                  })}
            </Text>

            <Text lineHeight={1} fontSize={12} color="new-gray.700" noOfLines={1} w="max-content">
              {formattedDate}
            </Text>
          </VStack>
          <Divider />
        </HStack>
      )}
    </Skeleton>
  )
}

export default KeyResultSectionTimelineCardUpdate
