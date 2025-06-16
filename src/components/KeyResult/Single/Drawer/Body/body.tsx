import { Box, Divider, Portal, Stack, Text } from '@chakra-ui/react'
import { useFlags } from 'flagsmith/react'
import React, { useRef } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import {
  KeyResultSectionDescription,
  KeyResultSectionObjective,
  KeyResultSectionOwner,
  KeyResultSectionTimeline,
  KeyResultSectionTitle,
  KeyResultSummarizeSection,
} from 'src/components/KeyResult/Single/Sections'
import { KeyResultSingleSectionDeadline } from 'src/components/KeyResult/Single/Sections/Deadline/wrapper'
import { KeyResultSingleSectionGoal } from 'src/components/KeyResult/Single/Sections/Goal/wrapper'
import { KEY_RESULT_FORMAT, KEY_RESULT_MODE } from 'src/components/KeyResult/constants'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { keyResultChecklistAtom } from 'src/state/recoil/key-result/checklist'

import { KeyResultChecklistWrapper } from '../../Sections/Checklist/wrapper'
import { KeyResultHistory } from '../../Sections/KeyResultHistory'
import { KeyResultProgress } from '../../Sections/Progress/wrapper'

import { SCROLLBAR_ID } from './constants'
import messages from './messages'

export interface KeyResultDrawerBodyProperties {
  readonly keyResultID: KeyResult['id']
  readonly isLoading?: boolean
  readonly isKeyResultPage?: boolean
}

const KeyResultDrawerBody = ({
  keyResultID,
  isLoading,
  isKeyResultPage,
}: KeyResultDrawerBodyProperties) => {
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))
  const flags = useFlags(['llms_openai_summary'])
  const objective = keyResult?.objective
  const intl = useIntl()
  const keyResultChecklist = useRecoilValue(keyResultChecklistAtom(keyResultID))
  const timelinePortalReference = useRef<HTMLDivElement>(null)

  const newCheckInValue =
    keyResult?.format === KEY_RESULT_FORMAT.PERCENTAGE &&
    keyResult?.initialValue === 0 &&
    keyResult?.goal === 100
      ? keyResultChecklist && keyResultChecklist?.edges?.length > 0
        ? keyResultChecklist?.progress.progress
        : undefined
      : undefined

  const isDraft = keyResult?.mode === KEY_RESULT_MODE.DRAFT
  const isKeyResultSummaryVisible = flags.llms_openai_summary.enabled

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
      {isDraft && (
        <Box textAlign="center" background="new-gray.600" paddingY="15px">
          <Text fontWeight={500} color="white">
            {intl.formatMessage(messages.headerMessage)}
          </Text>
        </Box>
      )}
      <Box pt={8} px={8} pb={4} bg="white">
        <KeyResultSectionTitle objective={objective} isDraft={isDraft} keyResultID={keyResultID} />
      </Box>
      <Portal containerRef={timelinePortalReference}>
        {isDraft && <KeyResultHistory />}
        <Box px={8} pt={4}>
          {keyResult && (
            <KeyResultSectionTimeline
              isDraft={isDraft}
              keyResultID={keyResultID}
              scrollTarget={SCROLLBAR_ID}
              newCheckInValue={newCheckInValue}
            />
          )}
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
        <KeyResultProgress keyResultID={keyResultID} />
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
        {isKeyResultSummaryVisible && !isDraft && keyResult && (
          <>
            <KeyResultSummarizeSection
              keyResult={keyResult}
              keyResultChecklist={keyResultChecklist}
            />
            <Divider borderColor="gray.100" />
          </>
        )}
        <KeyResultChecklistWrapper keyResultID={keyResultID} isLoading={isLoading} />
        <Divider borderColor="gray.100" />
        <KeyResultSectionOwner keyResultID={keyResultID} />
        <Divider borderColor="gray.100" />
        <KeyResultSectionObjective
          isDraft={isDraft}
          isKeyResultPage={isKeyResultPage}
          keyResultID={keyResultID}
        />
      </Stack>
      <Box ref={timelinePortalReference} />
    </Stack>
  )
}

export default KeyResultDrawerBody
