import { Box, Divider, Stack } from '@chakra-ui/react'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilState, useSetRecoilState } from 'recoil'

import {
  KeyResultSectionDescription,
  KeyResultSectionTimeline,
  KeyResultSectionTitle,
} from 'src/components/KeyResult/Single/Sections'
import { KeyResult } from 'src/components/KeyResult/types'
import {
  keyResultDrawerIntlDeletedEntryType,
  keyResultDrawerIsCreatingCheckIn,
  keyResultDrawerIsScrolling,
} from 'src/state/recoil/key-result/drawer'

import { KeyResultSingleSectionDeadline } from '../../Sections/Deadline/wrapper'
import { KeyResultSingleSectionGoal } from '../../Sections/Goal/wrapper'

import { PERFECT_SCROLLBAR_ID } from './constants'

export interface KeyResultDrawerBodyProperties {
  keyResultID: KeyResult['id']
  isLoading?: boolean
}

const KeyResultDrawerBody = ({ keyResultID, isLoading }: KeyResultDrawerBodyProperties) => {
  const [isScrolling, setIsScrolling] = useRecoilState(keyResultDrawerIsScrolling(keyResultID))
  const setIntlDeletedEntryType = useSetRecoilState(
    keyResultDrawerIntlDeletedEntryType(keyResultID),
  )
  const [isCreatingCheckIn, setIsCreatingCheckIn] = useRecoilState(
    keyResultDrawerIsCreatingCheckIn(keyResultID),
  )

  const handleScrollY = () => {
    if (!isScrolling) setIsScrolling(true)
    if (isCreatingCheckIn) setIsCreatingCheckIn(false)
  }

  const handleScrollYReachStart = () => {
    if (isScrolling) setIsScrolling(false)
  }

  const handleEntryDelete = (entryType: string) => {
    setIntlDeletedEntryType(entryType)
  }

  return (
    <PerfectScrollbar
      id={PERFECT_SCROLLBAR_ID}
      options={{ suppressScrollX: true }}
      onScrollY={handleScrollY}
      onYReachStart={handleScrollYReachStart}
    >
      <Stack flexGrow={1} overflow="auto" p={4} pt={0} gridGap={4}>
        <KeyResultSectionTitle keyResultID={keyResultID} />
        <Divider borderColor="gray.100" />
        <KeyResultSectionDescription keyResultID={keyResultID} isLoading={isLoading} />

        <Stack direction="row">
          <Box flexGrow={1}>
            <KeyResultSingleSectionGoal keyResultID={keyResultID} isLoading={isLoading} />
          </Box>

          <Box flexGrow={1}>
            <KeyResultSingleSectionDeadline keyResultID={keyResultID} isLoading={isLoading} />
          </Box>
        </Stack>

        <KeyResultSectionTimeline
          keyResultID={keyResultID}
          scrollTarget={PERFECT_SCROLLBAR_ID}
          onEntryDelete={handleEntryDelete}
        />
      </Stack>
    </PerfectScrollbar>
  )
}

export default KeyResultDrawerBody
