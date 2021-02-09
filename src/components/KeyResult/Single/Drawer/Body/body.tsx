import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
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
  const [scrollBarReference, setScrollBarReference] = useState<
    PerfectScrollbar | null | undefined
  >()

  const handleScrollYStart = () => {
    if (!isScrolling) setIsScrolling(true)
    if (isCreatingCheckIn) setIsCreatingCheckIn(false)
  }

  const handleScrollYReachedStart = () => {
    if (isScrolling) setIsScrolling(false)
  }

  return (
    <PerfectScrollbar
      ref={(reference) => setScrollBarReference(reference)}
      style={{ paddingTop: '1rem' }}
      onScrollY={handleScrollYStart}
      onYReachStart={handleScrollYReachedStart}
    >
      <Box p={4} pt={0}>
        <KeyResultSectionTimeline keyResultID={keyResultID} scrollBarRef={scrollBarReference} />
      </Box>
    </PerfectScrollbar>
  )
}

export default KeyResultDrawerBody
