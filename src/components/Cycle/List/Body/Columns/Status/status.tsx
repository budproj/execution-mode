import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
  useToast,
} from '@chakra-ui/react'
import React, { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import CyclesListBodyColumnBase, {
  CyclesListBodyColumnBaseProperties,
} from 'src/components/Cycle/List/Body/Columns/Base'
import { CYCLE_STATUS } from 'src/components/Cycle/constants'
import { useUpdateCycle } from 'src/components/Cycle/hooks'
import { Cycle } from 'src/components/Cycle/types'
import { Check, ChevronDown } from 'src/components/Icon'
import buildPartialSelector from 'src/state/recoil/cycle/build-partial-selector'

import messages from './messages'

export interface CyclesListBodyColumnStatusProperties extends CyclesListBodyColumnBaseProperties {
  id?: Cycle['id']
  canEdit: boolean
}

const statusSelector = buildPartialSelector<Cycle['active']>('active')

const CyclesListBodyColumnStatus = ({
  id,
  canEdit,
}: CyclesListBodyColumnStatusProperties): ReactElement => {
  const intl = useIntl()
  const { updateCycle, loading, error, data } = useUpdateCycle()
  const toast = useToast()

  const cycleStatus = useRecoilValue(statusSelector(id))
    ? CYCLE_STATUS.ACTIVE
    : CYCLE_STATUS.NOT_ACTIVE

  const isStatusLoaded = Boolean(cycleStatus)

  const [statusState, setStatusState] = useState<CYCLE_STATUS>()

  const handleChangeCycleStatus = async (statusState: CYCLE_STATUS) => {
    await updateCycle({
      variables: {
        id,
        active: statusState === CYCLE_STATUS.ACTIVE,
      },
    })
  }

  useEffect(() => {
    setStatusState(cycleStatus)
  }, [cycleStatus])

  const titleStatesLabels = new Map([
    [CYCLE_STATUS.ACTIVE, intl.formatMessage(messages.activeCycleTitleOption)],
    [CYCLE_STATUS.NOT_ACTIVE, intl.formatMessage(messages.notActiveCycleTitleOption)],
  ])

  const descriptionStatesLabels = new Map([
    [CYCLE_STATUS.ACTIVE, intl.formatMessage(messages.activeCycleDescriptionOption)],
    [CYCLE_STATUS.NOT_ACTIVE, intl.formatMessage(messages.notActiveCycleDescriptionOption)],
  ])

  const handleSelectStatus = (statusState: CYCLE_STATUS) => {
    setStatusState(statusState)
    handleChangeCycleStatus(statusState)
  }

  useEffect(() => {
    if (!loading) {
      if (error) {
        toast({
          title: intl.formatMessage(messages.unknownErrorToastMessage),
          status: 'error',
        })
      } else if (data) {
        toast({
          status: 'success',
          title: intl.formatMessage(messages.successParcialEditToastMessage, {
            period: data.updateCycle.period,
            status: data.updateCycle.active
              ? messages.inactiveCycleStatus.defaultMessage
              : messages.activeCycleStatus.defaultMessage,
          }),
        })
      }
    }
  }, [loading, error, data, toast, intl])

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
        <Skeleton isLoaded={isStatusLoaded} {...buildSkeletonMinSize(isStatusLoaded, 140, 28)}>
          <Menu placement="bottom-end">
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  borderWidth={1}
                  backgroundColor="brand.50"
                  cursor={canEdit ? 'pointer' : 'default'}
                  disabled={!canEdit}
                  borderColor={`${
                    statusState === CYCLE_STATUS.ACTIVE ? 'brand.500' : 'new-gray.600'
                  }`}
                  color={`${statusState === CYCLE_STATUS.ACTIVE ? 'brand.500' : 'new-gray.600'}`}
                  borderRadius={4}
                  px="0.65rem"
                  py="0.35rem"
                  h="auto"
                  fontSize="sm"
                  width={110}
                  iconSpacing={12}
                  rightIcon={
                    <ChevronDown
                      desc="menu"
                      ml={5}
                      fontSize="xs"
                      fill="current"
                      stroke="current"
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
                  {statusState && titleStatesLabels.get(statusState)}
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
                      onClick={() => handleSelectStatus(labelEnum)}
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
        </Skeleton>
      </Flex>
    </CyclesListBodyColumnBase>
  )
}

export default CyclesListBodyColumnStatus
