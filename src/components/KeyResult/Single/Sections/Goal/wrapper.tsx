import { Box, Stack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import GoalIcon from 'src/components/Icon/Goal'
import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import { KeyResultSectionGoalInterface } from './interface'
import messages from './messages'

export const KeyResultSingleSectionGoal = ({
  keyResultID,
  isLoading,
}: KeyResultSectionGoalInterface) => {
  const intl = useIntl()
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))

  const GoalNumberMask = selectMaskBasedOnFormat(keyResult?.format)
  const hasData = typeof keyResult?.goal !== 'undefined'

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
        <GoalIcon fill="gray.400" w={6} h={6} desc={intl.formatMessage(messages.iconDescription)} />
      </Box>

      <Stack spacing={0}>
        <KeyResultSectionHeading>{intl.formatMessage(messages.heading)}</KeyResultSectionHeading>

        <GoalNumberMask
          color="currentColor"
          fontSize="md"
          value={keyResult?.goal}
          displayType="text"
        />
      </Stack>
    </Stack>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}
