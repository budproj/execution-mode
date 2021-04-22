import { Box, Stack } from '@chakra-ui/layout'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import GoalIcon from 'src/components/Icon/Goal'
import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import { KeyResultSectionGoalInterface } from './interface'
import messages from './messages'

const goalSelector = buildPartialSelector<KeyResult['goal']>('goal')
const formatSelector = buildPartialSelector<KeyResult['format']>('format')

export const KeyResultSingleSectionGoal = ({
  keyResultID,
  isLoading,
}: KeyResultSectionGoalInterface) => {
  const intl = useIntl()
  const goal = useRecoilValue(goalSelector(keyResultID))
  const format = useRecoilValue(formatSelector(keyResultID))

  const GoalNumberMask = selectMaskBasedOnFormat(format)
  const hasData = typeof goal !== 'undefined'
  isLoading ??= hasData

  return hasData || isLoading ? (
    <Stack direction="row" alignItems="center" spacing={3}>
      <Box
        w={10}
        h={10}
        background="gray.50"
        display="flex"
        borderRadius="full"
        alignItems="center"
        justifyContent="center"
      >
        <GoalIcon fill="gray.400" w={5} h={5} desc={intl.formatMessage(messages.iconDescription)} />
      </Box>

      <Stack spacing={0}>
        <KeyResultSectionHeading>{intl.formatMessage(messages.heading)}</KeyResultSectionHeading>
        <GoalNumberMask value={goal} displayType="text" />
      </Stack>
    </Stack>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}
