import { useTheme, Collapse, Box } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { KeyResultSectionAddCheckIn } from 'src/components/KeyResult/Single/Sections'
import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { keyResultTimelineIntlDeletedEntryType } from 'src/state/recoil/key-result/timeline'
import selectLatestTimelineEntry from 'src/state/recoil/key-result/timeline/latest-entry'

import KeyResultSectionTimelineDeleteAlert from './DeleteAlert'

export interface KeyResultSectionTimelineHeaderProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultSectionTimelineHeader = ({
  keyResultID,
}: KeyResultSectionTimelineHeaderProperties) => {
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))
  const setLatestTimelineEntry = useSetRecoilState(selectLatestTimelineEntry(keyResultID))
  const intlDeletedEntryType = useRecoilValue(keyResultTimelineIntlDeletedEntryType(keyResultID))
  const theme = useTheme()

  const checkInPolicy = keyResult?.keyResultCheckIns?.policy

  const canUpdate = checkInPolicy?.create === GraphQLEffect.ALLOW

  const handleCheckInCompleted = (data: KeyResultCheckIn) => {
    setLatestTimelineEntry(data)
  }

  return (
    <Box
      bg="white"
      position="sticky"
      top={0}
      py={canUpdate || Boolean(intlDeletedEntryType) ? 4 : 0}
      zIndex={theme.zIndices.docked}
    >
      <KeyResultSectionTimelineDeleteAlert keyResultID={keyResultID} />

      <Collapse unmountOnExit in={canUpdate} style={{ overflow: 'visible' }}>
        <KeyResultSectionAddCheckIn
          keyResultID={keyResultID}
          onCompleted={handleCheckInCompleted}
        />
      </Collapse>
    </Box>
  )
}

export default KeyResultSectionTimelineHeader
