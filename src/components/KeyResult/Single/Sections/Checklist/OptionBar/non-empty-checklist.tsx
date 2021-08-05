import { Flex, Skeleton, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import CheckIcon from 'src/components/Icon/Check'
import { KeyResultChecklistProgress } from 'src/components/KeyResult/types'

import messages from './messages'

interface NonEmptyChecklistProperties {
  progress?: KeyResultChecklistProgress
}

export const NonEmptyChecklist = ({ progress }: NonEmptyChecklistProperties) => {
  const intl = useIntl()

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Flex bg="brand.100" borderRadius="full" w={4} h={4}>
        <CheckIcon
          desc={intl.formatMessage(messages.checkIconDescription)}
          fill="brand.500"
          stroke="brand.500"
        />
      </Flex>
      <Skeleton isLoaded={Boolean(progress)}>
        <Text color="brand.500" fontSize="sm" fontWeight={500}>
          {intl.formatMessage(messages.completed, {
            completed: progress?.numberOfChecked ?? 0,
            total: progress?.total ?? 0,
          })}
        </Text>
      </Skeleton>
    </Stack>
  )
}
