import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React, { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'

import CyclesListBodyColumnBase, {
  CyclesListBodyColumnBaseProperties,
} from 'src/components/Cycle/List/Body/Columns/Base'
import { CYCLE_STATUS } from 'src/components/Cycle/constants'
import { Cycle } from 'src/components/Cycle/types'
import { Check, ChevronDown } from 'src/components/Icon'

import messages from './messages'

export interface CyclesListBodyColumnStatusProperties extends CyclesListBodyColumnBaseProperties {
  id?: Cycle['id']
}

// Const statusSelector = buildPartialSelector<Cycle>['status']>('status')

const CyclesListBodyColumnStatus = ({ id }: CyclesListBodyColumnStatusProperties): ReactElement => {
  // Const status = useRecoilValue(statusSelector(id))
  const intl = useIntl()
  const [statusState, setStatusState] = useState(CYCLE_STATUS.ACTIVE)

  const titleStatesLabels = new Map([
    [CYCLE_STATUS.ACTIVE, intl.formatMessage(messages.activeCycleTitleOption)],
    [CYCLE_STATUS.NOT_ACTIVE, intl.formatMessage(messages.notActiveCycleTitleOption)],
  ])

  const descriptionStatesLabels = new Map([
    [CYCLE_STATUS.ACTIVE, intl.formatMessage(messages.activeCycleDescriptionOption)],
    [CYCLE_STATUS.NOT_ACTIVE, intl.formatMessage(messages.notActiveCycleDescriptionOption)],
  ])

  const handleTaskFilterChange = (statusState: CYCLE_STATUS) => {
    setStatusState(statusState)
  }

  return (
    <CyclesListBodyColumnBase
      borderStyle="solid"
      pr={2}
      h="full"
      alignItems="center"
      display="flex"
      minWidth="280px"
    >
      <Flex alignItems="center">
        <Menu placement="bottom-end">
          {({ isOpen }) => (
            <>
              <MenuButton
                as={Button}
                borderWidth={1}
                backgroundColor="brand.50"
                borderColor={`${
                  statusState === CYCLE_STATUS.ACTIVE ? 'brand.500' : 'new-gray.600'
                }`}
                color={`${statusState === CYCLE_STATUS.ACTIVE ? 'brand.500' : 'new-gray.600'}`}
                borderRadius={4}
                px="0.65rem"
                py="0.35rem"
                h="auto"
                fontSize="sm"
                iconSpacing={12}
                rightIcon={
                  <ChevronDown
                    desc="menu"
                    fontSize="xs"
                    fill="current"
                    stroke="current"
                    right={2}
                    transition="0.2s transform ease-in"
                    transform={isOpen ? 'rotate(180deg)' : 'none'}
                  />
                }
                _hover={{
                  color: `${statusState === CYCLE_STATUS.ACTIVE ? 'brand.400' : 'new-gray.500'}`,
                  borderColor: `${
                    statusState === CYCLE_STATUS.ACTIVE ? 'brand.400' : 'new-gray.500'
                  }`,
                }}
              >
                {titleStatesLabels.get(statusState)}
              </MenuButton>
              <MenuList
                boxShadow="lg"
                borderColor="new-gray.200"
                borderWidth={1}
                overflow="hidden"
                zIndex={999}
                minWidth="auto"
              >
                {[...titleStatesLabels].map(([labelEnum]) => (
                  <MenuItem
                    key={labelEnum}
                    p="0.35rem 3rem 0.35rem 0.75rem"
                    color="new-gray.800"
                    h="auto"
                    fontSize="sm"
                    fontWeight={500}
                    transition="0.2s background-color, 0.2s color"
                    onClick={() => handleTaskFilterChange(labelEnum)}
                  >
                    <Box>
                      <Flex gap={2}>
                        <Text fontSize={12} color="current" fontWeight={700}>
                          {titleStatesLabels.get(labelEnum)}
                        </Text>
                        {statusState === labelEnum && (
                          <Check desc="menu" fontSize="large" stroke="current" fill="current" />
                        )}
                      </Flex>
                      <Text fontSize={12} fontWeight={400} color="new-gray.700" maxW="md" mt={1}>
                        {descriptionStatesLabels.get(labelEnum)}
                      </Text>
                    </Box>
                  </MenuItem>
                ))}
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
    </CyclesListBodyColumnBase>
  )
}

export default CyclesListBodyColumnStatus
