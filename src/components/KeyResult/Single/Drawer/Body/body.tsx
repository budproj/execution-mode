import { Box } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { KeyResultSectionTimeline } from 'src/components/KeyResult/Single/Sections'
import { KeyResult } from 'src/components/KeyResult/types'
import {
  keyResultDrawerIntlDeletedEntryType,
  keyResultDrawerIsCreatingCheckIn,
  keyResultDrawerIsScrolling,
} from 'src/state/recoil/key-result/drawer'

export interface KeyResultDrawerBodyProperties {
  keyResultID: KeyResult['id']
}

const KeyResultDrawerBody = ({ keyResultID }: KeyResultDrawerBodyProperties) => {
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
    <Box flexGrow={1} overflow="auto">
      <KeyResultSectionTimeline
        keyResultID={keyResultID}
        onScrollY={handleScrollY}
        onScrollYReachStart={handleScrollYReachStart}
        onEntryDelete={handleEntryDelete}
      />
    </Box>
  )
}

export default KeyResultDrawerBody
