import { Box, Divider, Stack } from '@chakra-ui/react'
import React from 'react'

import {
  KeyResultSectionDescription,
  KeyResultSectionObjective,
  KeyResultSectionOwner,
  KeyResultSectionTimeline,
  KeyResultSectionTitle,
} from 'src/components/KeyResult/Single/Sections'
import { KeyResultSingleSectionDeadline } from 'src/components/KeyResult/Single/Sections/Deadline/wrapper'
import { KeyResultSingleSectionGoal } from 'src/components/KeyResult/Single/Sections/Goal/wrapper'
import { KeyResult } from 'src/components/KeyResult/types'

import { SCROLLBAR_ID } from './constants'

export interface KeyResultDrawerBodyProperties {
  keyResultID: KeyResult['id']
  isLoading?: boolean
}

const KeyResultDrawerBody = ({ keyResultID, isLoading }: KeyResultDrawerBodyProperties) => (
  <Stack
    flexGrow={1}
    overflowY="auto"
    overflowX="hidden"
    p={4}
    pt={0}
    gridGap={2}
    id={SCROLLBAR_ID}
  >
    <Box pt={4}>
      <KeyResultSectionTitle keyResultID={keyResultID} />
    </Box>
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
    <Divider borderColor="gray.100" />

    <KeyResultSectionOwner keyResultID={keyResultID} />
    <Divider borderColor="gray.100" />

    <KeyResultSectionObjective keyResultID={keyResultID} />
    <Divider borderColor="gray.100" />

    <KeyResultSectionTimeline keyResultID={keyResultID} scrollTarget={SCROLLBAR_ID} />
  </Stack>
)

export default KeyResultDrawerBody
