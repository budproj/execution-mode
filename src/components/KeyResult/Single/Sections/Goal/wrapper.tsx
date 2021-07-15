import { Box, Stack } from '@chakra-ui/layout'
import { Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/popover'
import { useTheme } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import ChevronDownIcon from 'src/components/Icon/ChevronDown'
import GoalIcon from 'src/components/Icon/Goal'
import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { GraphQLEffect } from 'src/components/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import { KeyResultSingleSectionGoalUpdateForm } from './UpdateForm/update-form'
import { KeyResultSectionGoalInterface } from './interface'
import messages from './messages'

export const KeyResultSingleSectionGoal = ({
  keyResultID,
  isLoading,
}: KeyResultSectionGoalInterface) => {
  const intl = useIntl()
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))
  const theme = useTheme()

  const GoalNumberMask = selectMaskBasedOnFormat(keyResult?.format)
  const hasData = typeof keyResult?.goal !== 'undefined'
  const canUpdate = keyResult?.policy?.update === GraphQLEffect.ALLOW && keyResult?.status?.isActive
  isLoading ??= hasData

  const handleUpdateOpen = () => {
    if (canUpdate && !isUpdateOpen) setIsUpdateOpen(true)
  }

  const handleUpdateClose = () => {
    if (canUpdate && isUpdateOpen) setIsUpdateOpen(false)
  }

  const handleMouseEnter = () => {
    if (!isHovering && canUpdate) setIsHovering(true)
  }

  const handleMouseLeave = () => {
    if (isHovering && canUpdate) setIsHovering(false)
  }

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

      <Stack spacing={0} zIndex={theme.zIndices.tooltip}>
        <KeyResultSectionHeading>{intl.formatMessage(messages.heading)}</KeyResultSectionHeading>
        <Popover
          isOpen={isUpdateOpen}
          placement="bottom-start"
          onOpen={handleUpdateOpen}
          onClose={handleUpdateClose}
        >
          <PopoverTrigger>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              cursor={canUpdate ? 'pointer' : 'auto'}
              color={isUpdateOpen || (canUpdate && isHovering) ? 'brand.400' : 'currentColor'}
              transition=".3s color ease-in-out"
              fontSize="lg"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <GoalNumberMask value={keyResult?.goal} displayType="text" />
              <ChevronDownIcon
                fill="brand.400"
                stroke="brand.400"
                opacity={isHovering || isUpdateOpen ? 1 : 0}
                desc={intl.formatMessage(messages.hoverIconDescription)}
                transition=".3s all ease-in-out"
                transform={isUpdateOpen ? 'rotate(180deg)' : 'none'}
                fontSize="xs"
              />
            </Stack>
          </PopoverTrigger>
          <PopoverContent width="sm">
            <KeyResultSingleSectionGoalUpdateForm
              keyResultID={keyResultID}
              onCancel={handleUpdateClose}
              onSubmit={handleUpdateClose}
            />
          </PopoverContent>
        </Popover>
      </Stack>
    </Stack>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}
