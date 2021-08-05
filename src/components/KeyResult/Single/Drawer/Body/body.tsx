import { Box, Divider, Portal, Stack } from '@chakra-ui/react'
import React, { useRef } from 'react'

import {
  KeyResultSectionDescription,
  KeyResultSectionOwner,
  KeyResultSectionTimeline,
  KeyResultSectionTitle,
} from 'src/components/KeyResult/Single/Sections'
import { KeyResultSingleSectionDeadline } from 'src/components/KeyResult/Single/Sections/Deadline/wrapper'
import { KeyResultSingleSectionGoal } from 'src/components/KeyResult/Single/Sections/Goal/wrapper'
import { KeyResult } from 'src/components/KeyResult/types'

import { KeyResultChecklistWrapper } from '../../Sections/Checklist/wrapper'

import { SCROLLBAR_ID } from './constants'

export interface KeyResultDrawerBodyProperties {
  keyResultID: KeyResult['id']
  isLoading?: boolean
}

const KeyResultDrawerBody = ({ keyResultID, isLoading }: KeyResultDrawerBodyProperties) => {
  const timelinePortalReference = useRef<HTMLDivElement>(null)

  return (
    <Stack
      spacing={0}
      flexGrow={1}
      pb={8}
      id={SCROLLBAR_ID}
      overflowY="auto"
      overflowX="hidden"
      bg="new-gray.50"
    >
      <Box pt={8} px={8} pb={2} bg="white">
        <KeyResultSectionTitle keyResultID={keyResultID} />
      </Box>

      <Portal containerRef={timelinePortalReference}>
        <Box p={8} pt={4}>
          <KeyResultSectionTimeline keyResultID={keyResultID} scrollTarget={SCROLLBAR_ID} />
        </Box>
      </Portal>

      <Stack
        spacing={4}
        px={8}
        pb={4}
        bg="white"
        borderBottomColor="new-gray.400"
        borderBottomWidth={1}
      >
        <Divider borderColor="gray.100" />

        <Stack direction="row">
          <Box flexGrow={1}>
            <KeyResultSingleSectionGoal keyResultID={keyResultID} isLoading={isLoading} />
          </Box>

          <Box flexGrow={1}>
            <KeyResultSingleSectionDeadline keyResultID={keyResultID} isLoading={isLoading} />
          </Box>
        </Stack>
        <Divider borderColor="gray.100" />

        <KeyResultSectionDescription keyResultID={keyResultID} isLoading={isLoading} />

        <KeyResultChecklistWrapper keyResultID={keyResultID} isLoading={isLoading} />
        <Divider borderColor="gray.100" />

        <KeyResultSectionOwner keyResultID={keyResultID} />
      </Stack>

      <Box ref={timelinePortalReference} />
    </Stack>
  )
}

export default KeyResultDrawerBody
