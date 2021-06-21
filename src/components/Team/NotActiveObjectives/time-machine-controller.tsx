import { Stack } from '@chakra-ui/layout'
import { Heading, IconButton } from '@chakra-ui/react'
import uniqBy from 'lodash/uniqBy'
import React from 'react'
import { useIntl } from 'react-intl'

import { FilteredCycles } from '../../../state/recoil/cycle/filters'
import CycleFilter from '../../Cycle/Filter'
import { Cycle } from '../../Cycle/types'
import TimesIcon from '../../Icon/Times'

import messages from './messages'

interface TimeMachineControllerProperties {
  filters: FilteredCycles
  cycles: Cycle[]
  onYearFilter: (cycleIDs: string[]) => void
  onQuarterFilter: (cycleIDs: string[]) => void
  onClose: () => void
}

export const TimeMachineController = ({
  filters,
  cycles,
  onYearFilter,
  onQuarterFilter,
  onClose,
}: TimeMachineControllerProperties) => {
  const intl = useIntl()

  const yearlyCycles =
    cycles.length > 0
      ? uniqBy(
          cycles.filter((cycle) => cycle.cadence === 'YEARLY'),
          'id',
        )
      : undefined

  return (
    <Stack spacing={4}>
      <Heading as="h2" fontSize="sm" color="gray.500" textTransform="uppercase">
        {intl.formatMessage(messages.timeMachineTitle)}
      </Heading>

      <Stack
        direction="row"
        bg="white"
        py={8}
        px={6}
        boxShadow="for-background.light"
        borderRadius="10"
        alignItems="center"
      >
        <Stack direction="row" flexGrow={1} alignItems="center">
          <Heading as="h3" fontSize="lg" color="gray.500" fontWeight={500}>
            {intl.formatMessage(messages.timeMachineDescription)}
          </Heading>

          <CycleFilter
            activeFilters={filters}
            yearOptions={yearlyCycles}
            flexGrow={1}
            onYearFilter={onYearFilter}
            onQuarterFilter={onQuarterFilter}
          />
        </Stack>

        <IconButton
          aria-label={intl.formatMessage(messages.timeMachineCloseIconDesc)}
          bg="gray.50"
          borderRadius="full"
          color="gray.300"
          _hover={{
            bg: 'red.500',
            color: 'white',
          }}
          onClick={onClose}
        >
          <TimesIcon
            desc={intl.formatMessage(messages.timeMachineCloseIconDesc)}
            fill="currentColor"
            stroke="currentColor"
          />
        </IconButton>
      </Stack>
    </Stack>
  )
}
