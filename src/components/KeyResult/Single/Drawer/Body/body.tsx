import { Box } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'

import { KeyResultSectionTimeline } from 'src/components/KeyResult/Single/Sections'
import { KeyResult } from 'src/components/KeyResult/types'
import {
  keyResultDrawerIsCreatingCheckIn,
  keyResultDrawerIsScrolling,
} from 'src/state/recoil/key-result/drawer'

export interface KeyResultDrawerBodyProperties {
  keyResultID: KeyResult['id']
}

const KeyResultDrawerBody = ({ keyResultID }: KeyResultDrawerBodyProperties) => {
  const [isScrolling, setIsScrolling] = useRecoilState(keyResultDrawerIsScrolling(keyResultID))
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

  return (
    <Box flexGrow={1} overflow="auto">
      <KeyResultSectionTimeline
        keyResultID={keyResultID}
        onScrollY={handleScrollY}
        onScrollYReachStart={handleScrollYReachStart}
      />
    </Box>
  )
}

export default KeyResultDrawerBody
