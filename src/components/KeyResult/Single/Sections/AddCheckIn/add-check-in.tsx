import { Skeleton, Button, Collapse, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import CheckInForm from 'src/components/KeyResult/CheckInForm'
import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'
import { KeyResultSectionTimelineCardBase } from 'src/components/KeyResult/Single/Sections/Timeline/Cards'
import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import { keyResultCheckInProgressDraft } from 'src/state/recoil/key-result/check-in'
import isCheckInModalOpenAtom from 'src/state/recoil/key-result/check-in/is-check-in-modal-open'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'
import { syncedFragments } from 'src/state/recoil/key-result/synced-fragments'

import messages from './messages'

export interface KeyResultSectionAddCheckInProperties {
  keyResultID?: KeyResult['id']
  onCompleted?: (data: KeyResultCheckIn) => void
  newCheckInValue?: number
}

const KeyResultSectionAddCheckIn = ({
  keyResultID,
  onCompleted,
  newCheckInValue,
}: KeyResultSectionAddCheckInProperties) => {
  const intl = useIntl()

  const isCheckInModalOpen = useRecoilValue(isCheckInModalOpenAtom)
  const setIsCheckInModalOpen = useSetRecoilState(isCheckInModalOpenAtom)
  const latestKeyResultCheckIn = useRecoilValue(selectLatestCheckIn(keyResultID))
  const setDraftValue = useSetRecoilState(keyResultCheckInProgressDraft(keyResultID))
  const resetSyncedFragments = useResetRecoilState(syncedFragments(keyResultID))

  const myReference = useRef<null | HTMLDivElement>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const executeScroll = () => myReference?.current?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    setTimeout(() => {
      executeScroll()
    }, 800)
  }, [executeScroll])

  const isLoaded = typeof latestKeyResultCheckIn?.value !== 'undefined'

  const handleOpen = () => {
    setIsCheckInModalOpen(true)
  }

  const handleClose = () => {
    setIsCheckInModalOpen(false)
    setDraftValue(latestKeyResultCheckIn?.value)
  }

  const handleSubmit = (values: CheckInFormValues) => {
    if (values.valueNew) setDraftValue(values.valueNew)
    setIsCheckInModalOpen(false)
    resetSyncedFragments()
  }

  return (
    <Flex direction="column" gridGap={4}>
      <Skeleton isLoaded={isLoaded}>
        <Button
          variant="solid"
          w="100%"
          colorScheme={isCheckInModalOpen ? 'gray' : 'brand'}
          onClick={isCheckInModalOpen ? handleClose : handleOpen}
        >
          {intl.formatMessage(
            isCheckInModalOpen ? messages.buttonLabelClose : messages.buttonLabelOpen,
          )}
        </Button>
      </Skeleton>

      <Collapse animateOpacity in={isCheckInModalOpen} style={{ overflow: 'visible' }}>
        <KeyResultSectionTimelineCardBase hideUser>
          <Heading
            ref={myReference}
            fontSize="xl"
            fontWeight={700}
            color="new-gray.900"
            flexGrow={1}
            lineHeight="2rem"
          >
            {intl.formatMessage(messages.formTitle)}
          </Heading>

          <CheckInForm
            showGoal
            isCommentAlwaysEnabled
            keyResultID={keyResultID}
            afterSubmit={handleSubmit}
            valueNew={newCheckInValue}
            onCompleted={onCompleted}
          />
        </KeyResultSectionTimelineCardBase>
      </Collapse>
    </Flex>
  )
}

export default KeyResultSectionAddCheckIn
