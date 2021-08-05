import { Flex, Skeleton, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { SliderWithFilledTrack } from 'src/components/Base'
import CheckIcon from 'src/components/Icon/Check'
import { PercentageNumberMask } from 'src/components/KeyResult/NumberMasks'
import { KeyResultChecklistProgress } from 'src/components/KeyResult/types'

import messages from './messages'

interface NonEmptyChecklistProperties {
  progress?: KeyResultChecklistProgress
}

export const NonEmptyChecklist = ({ progress }: NonEmptyChecklistProperties) => {
  const intl = useIntl()
  const isLoaded = Boolean(progress)

  return (
    <Stack direction="row" alignItems="center" flexGrow={1} spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center" flexGrow={1}>
        <Flex bg="brand.100" borderRadius="full" w={4} h={4}>
          <CheckIcon
            desc={intl.formatMessage(messages.checkIconDescription)}
            fill="brand.500"
            stroke="brand.500"
          />
        </Flex>
        <Skeleton isLoaded={isLoaded}>
          <Text color="brand.500" fontSize="sm" fontWeight={500}>
            {intl.formatMessage(messages.completed, {
              completed: progress?.numberOfChecked ?? 0,
              total: progress?.total ?? 0,
            })}
          </Text>
        </Skeleton>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        fontSize="sm"
        fontWeight={700}
        color="new-gray.800"
      >
        <Skeleton isLoaded={isLoaded}>
          <Flex>
            <SliderWithFilledTrack value={progress?.progress ?? 0} minW={24} />
          </Flex>
        </Skeleton>

        <Skeleton isLoaded={isLoaded}>
          <PercentageNumberMask displayType="text" value={progress?.progress ?? 0} />
        </Skeleton>
      </Stack>
    </Stack>
  )
}
