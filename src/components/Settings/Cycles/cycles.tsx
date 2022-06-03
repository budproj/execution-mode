import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { without } from 'lodash'
import React, { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { CreateCycleModal } from 'src/components/Cycle/ActionModals/CreateCycleModal'
import { UpdateCycleModal } from 'src/components/Cycle/ActionModals/UpdateCycleModal'
import CyclesList from 'src/components/Cycle/List'
import { CYCLE_LIST_COLUMN } from 'src/components/Cycle/List/Body/Columns/constants'
import { useGetCycle } from 'src/components/Cycle/hooks'
import { cyclesEditModalViewMode } from 'src/state/recoil/cycle/cycle-edit-modal-view-mode'

import messages from './messages'

const SettingsCycles = () => {
  const { data: cycles, loading: cyclesLoading } = useGetCycle()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [{ cycleId, isOpened }, setIsOpened] = useRecoilState(cyclesEditModalViewMode)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const closeEditModal = () => setIsOpened({ cycleId: '', isOpened: false })

  const cycleIds = useMemo(() => cycles.map(({ id }) => id), [cycles])
  const parents = useMemo(() => cycles.map(({ id, period }) => ({ id, label: period })), [cycles])

  const intl = useIntl()

  const columns = without([
    CYCLE_LIST_COLUMN.CYCLE,
    CYCLE_LIST_COLUMN.CADENCE_LEVEL,
    CYCLE_LIST_COLUMN.INITIAL_DATE,
    CYCLE_LIST_COLUMN.END_DATE,
    CYCLE_LIST_COLUMN.STATUS,
    CYCLE_LIST_COLUMN.ACTIONS,
  ]) as CYCLE_LIST_COLUMN[]

  return (
    <Flex flexDir="column">
      <Heading display="flex" alignItems="center" justifyContent="space-between">
        <Box flexDir="column">
          <Text fontSize={24} fontWeight={400} color="#121415" lineHeight="30px" mb={3}>
            {intl.formatMessage(messages.subTitle)}
          </Text>
          <Text fontSize={14} fontWeight={400} color="new-gray.700" lineHeight="17px">
            {intl.formatMessage(messages.pageDescription, {
              breakingline: <br />,
            })}
          </Text>
        </Box>
        <Button
          bg="brand.500"
          color="black.50"
          _hover={{ background: 'brand.400', color: 'black.50' }}
          onClick={openModal}
        >
          {intl.formatMessage(messages.createCycleButton)}
        </Button>
      </Heading>
      <CyclesList pt={10} cycleIDs={cycleIds} isLoading={cyclesLoading} columns={columns} />
      <CreateCycleModal isOpen={isModalOpen} onCancel={closeModal} />
      <UpdateCycleModal
        isOpen={isOpened}
        cycleId={cycleId}
        parents={parents}
        onCancel={closeEditModal}
      />
    </Flex>
  )
}

export default SettingsCycles
