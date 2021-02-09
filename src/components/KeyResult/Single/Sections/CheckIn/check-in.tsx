import { Skeleton, Button, Collapse, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import CheckInForm from 'src/components/KeyResult/CheckInForm'
import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import { keyResultCheckInProgressDraft } from 'src/state/recoil/key-result/check-in'
import { keyResultDrawerIsCreatingCheckIn } from 'src/state/recoil/key-result/drawer'
import { selectCurrentProgress } from 'src/state/recoil/key-result/selectors'

import { KeyResultSectionTimelineCardBase } from '../Timeline/Cards'

import messages from './messages'

export interface KeyResultSectionCheckInProperties {
  keyResultID?: KeyResult['id']
  onCompleted?: (data: KeyResultCheckIn) => void
}

const KeyResultSectionCheckIn = ({
  keyResultID,
  onCompleted,
}: KeyResultSectionCheckInProperties) => {
  const [isCreatingCheckIn, setIsCreatingCheckIn] = useRecoilState(
    keyResultDrawerIsCreatingCheckIn(keyResultID),
  )
  const currentProgress = useRecoilValue(selectCurrentProgress(keyResultID))
  const setDraftValue = useSetRecoilState(keyResultCheckInProgressDraft(keyResultID))
  const intl = useIntl()

  const isLoaded = typeof currentProgress !== 'undefined'

  const handleOpen = () => {
    setIsCreatingCheckIn(true)
  }

  const handleClose = () => {
    setIsCreatingCheckIn(false)
    setDraftValue(currentProgress)
  }

  return (
    <Flex direction="column" gridGap={4}>
      <Skeleton isLoaded={isLoaded}>
        <Button
          variant="solid"
          w="100%"
          colorScheme={isCreatingCheckIn ? 'gray' : 'brand'}
          onClick={isCreatingCheckIn ? handleClose : handleOpen}
        >
          {intl.formatMessage(
            isCreatingCheckIn ? messages.buttonLabelClose : messages.buttonLabelOpen,
          )}
        </Button>
      </Skeleton>
      <Collapse animateOpacity in={isCreatingCheckIn}>
        <KeyResultSectionTimelineCardBase>
          <Flex pb={4}>
            <Heading fontSize="md" fontWeight={700} color="gray.600" flexGrow={1}>
              {intl.formatMessage(messages.formTitle)}
            </Heading>
          </Flex>

          <CheckInForm
            showGoal
            isCommentAlwaysEnabled
            keyResultID={keyResultID}
            afterSubmit={handleClose}
            onCompleted={onCompleted}
          />
        </KeyResultSectionTimelineCardBase>
      </Collapse>
    </Flex>
  )
}

export default KeyResultSectionCheckIn
