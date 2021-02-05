import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { KeyResultSectionTimeline } from 'src/components/KeyResult/Single/Sections'
import { KeyResult } from 'src/components/KeyResult/types'

export interface KeyResultDrawerBodyProperties {
  keyResultID: KeyResult['id']
  onScrollY: () => void
  onScrollYReachStart: () => void
}

const KeyResultDrawerBody = ({
  keyResultID,
  onScrollY,
  onScrollYReachStart,
}: KeyResultDrawerBodyProperties) => {
  const [scrollBarReference, setScrollBarReference] = useState<
    PerfectScrollbar | null | undefined
  >()

  return (
    <PerfectScrollbar
      ref={(reference) => setScrollBarReference(reference)}
      onScrollY={onScrollY}
      onYReachStart={onScrollYReachStart}
    >
      <Box p={4}>
        <KeyResultSectionTimeline keyResultID={keyResultID} scrollBarRef={scrollBarReference} />
      </Box>
    </PerfectScrollbar>
  )
}

export default KeyResultDrawerBody
