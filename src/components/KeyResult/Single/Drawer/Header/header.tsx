import { DrawerHeader, useTheme, Collapse, Box } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { KeyResultSectionAddCheckIn } from 'src/components/KeyResult/Single/Sections'
import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import selectLatestTimelineEntry from 'src/state/recoil/key-result/timeline/latest-entry'

import KeyResultDrawerDeleteAlert from './DeleteAlert'

export interface KeyResultDrawerHeaderProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultDrawerHeader = ({ keyResultID }: KeyResultDrawerHeaderProperties) => {
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))
  const setLatestTimelineEntry = useSetRecoilState(selectLatestTimelineEntry(keyResultID))
  const theme = useTheme()

  const checkInPolicy = keyResult?.keyResultCheckIns?.policy

  const canUpdate = checkInPolicy?.create === GraphQLEffect.ALLOW

  const handleCheckInCompleted = (data: KeyResultCheckIn) => {
    setLatestTimelineEntry(data)
  }

  return (
    <DrawerHeader bg="white" position="sticky" top={0} zIndex={theme.zIndices.tooltip} p={0}>
      <KeyResultDrawerDeleteAlert keyResultID={keyResultID} />

      <Collapse unmountOnExit in={canUpdate} style={{ overflow: 'visible' }}>
        <Box px={4} pb={4}>
          <KeyResultSectionAddCheckIn
            keyResultID={keyResultID}
            onCompleted={handleCheckInCompleted}
          />
        </Box>
      </Collapse>
    </DrawerHeader>
  )
}

export default KeyResultDrawerHeader
