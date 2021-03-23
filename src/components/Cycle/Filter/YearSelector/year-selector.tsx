import { useLazyQuery } from '@apollo/client'
import { Button } from '@chakra-ui/button'
import { Box, Flex } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { Text } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { Cycle } from 'src/components/Cycle/types'
import CalendarOutlineIcon from 'src/components/Icon/CalendarOutline'
import ChevronDownIcon from 'src/components/Icon/ChevronDown'
import { cycleAtomFamily } from 'src/state/recoil/cycle'
import selectCyclesFromList from 'src/state/recoil/cycle/select-from-list'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'

import messages from './messages'
import queries from './queries.gql'
import CycleFilterYearSelectorYearList from './year-list'

export interface CycleFilterYearSelectorProperties {
  onYearFilter: (cycleIDs: Array<Cycle['id']>) => void
  filteredYearIDs?: Array<Cycle['id']>
}

type NotActiveYearlyCyclesResult = {
  cycles: Array<{
    id: Cycle['id']
    period: Cycle['period']
  }>
}

const CycleFilterYearSelector = ({
  onYearFilter,
  filteredYearIDs,
}: CycleFilterYearSelectorProperties) => {
  const [isOpen, setIsOpen] = useState(false)
  const loadCycles = useRecoilFamilyLoader<Cycle>(cycleAtomFamily)
  const cycles = useRecoilValue(selectCyclesFromList(filteredYearIDs))
  const intl = useIntl()
  const [
    fetchNotActiveYearlyCycles,
    { called, loading, data },
  ] = useLazyQuery<NotActiveYearlyCyclesResult>(queries.GET_NOT_ACTIVE_YEARLY_CYCLES, {
    onCompleted: (data) => {
      loadCycles(data.cycles)
    },
  })

  const handleOpenMenu = () => {
    fetchNotActiveYearlyCycles()
    setIsOpen(true)
  }

  const handleCloseMenu = () => {
    setIsOpen(false)
  }

  const isFilterActive = filteredYearIDs && filteredYearIDs.length > 0
  const selectedCyclePeriods = cycles.map((cycle) => cycle?.period).join(', ')

  return (
    <Menu closeOnSelect={false} isOpen={isOpen} onOpen={handleOpenMenu} onClose={handleCloseMenu}>
      <MenuButton
        as={Button}
        colorScheme="black"
        color="gray.500"
        variant="outline"
        fontSize="sm"
        leftIcon={
          <CalendarOutlineIcon
            fill="currentColor"
            desc={intl.formatMessage(messages.yearLeftIconDesc)}
          />
        }
        rightIcon={
          <Box pl={4}>
            <ChevronDownIcon
              fill="gray.200"
              stroke="gray.200"
              w={3}
              h="auto"
              transition=".2s all ease-in-out"
              desc={intl.formatMessage(messages.yearRightIconDescClosed)}
              transform={isOpen ? 'rotate(180deg)' : 'none'}
            />
          </Box>
        }
        _hover={{
          borderColor: 'gray.200',

          '& span:last-child svg': {
            fill: 'gray.500',
            stroke: 'gray.500',
          },
        }}
      >
        <Text isTruncated maxW={40}>
          {isFilterActive
            ? selectedCyclePeriods
            : intl.formatMessage(messages.yearSelectorEmptyState)}
        </Text>
      </MenuButton>
      <MenuList>
        {loading || !called ? (
          <Flex p={4} alignItems="center" justifyContent="center">
            <Spinner color="gray.400" />
          </Flex>
        ) : (
          <CycleFilterYearSelectorYearList cycles={data?.cycles} onFilter={onYearFilter} />
        )}
      </MenuList>
    </Menu>
  )
}

export default CycleFilterYearSelector
