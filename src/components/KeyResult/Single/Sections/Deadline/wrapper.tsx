import { Box, Skeleton, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import CalendarFilledOutlineIcon from 'src/components/Icon/CalendarFilledOutline'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import { KeyResultSectionDeadlineInterface } from './interface'
import messages from './messages'

const objectiveSelector = buildPartialSelector<KeyResult['objective']>('objective')

export const KeyResultSingleSectionDeadline = ({
  keyResultID,
  isLoading,
}: KeyResultSectionDeadlineInterface) => {
  const intl = useIntl()
  const objective = useRecoilValue(objectiveSelector(keyResultID))

  const hasData = typeof objective !== 'undefined'
  isLoading ??= hasData

  return hasData || isLoading ? (
    <Stack direction="row" alignItems="center" spacing={3}>
      <Box
        w={12}
        h={12}
        background="gray.50"
        display="flex"
        borderRadius="full"
        alignItems="center"
        justifyContent="center"
      >
        <CalendarFilledOutlineIcon
          fill="gray.400"
          w={6}
          h={6}
          desc={intl.formatMessage(messages.iconDescription)}
        />
      </Box>

      <Stack spacing={0} fontSize="lg">
        <KeyResultSectionHeading>{intl.formatMessage(messages.heading)}</KeyResultSectionHeading>
        <Skeleton isLoaded={!isLoading}>
          <Text>{intl.formatDate(objective?.cycle?.dateEnd)}</Text>
        </Skeleton>
      </Stack>
    </Stack>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}
