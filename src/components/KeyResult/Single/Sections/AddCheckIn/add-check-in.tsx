import { Skeleton, Button, Collapse, Flex, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import CheckInForm from 'src/components/KeyResult/CheckInForm'
import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'
import { KeyResultSectionTimelineCardBase } from 'src/components/KeyResult/Single/Sections/Timeline/Cards'
import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import { keyResultCheckInProgressDraft } from 'src/state/recoil/key-result/check-in'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'

import messages from './messages'

export interface KeyResultSectionAddCheckInProperties {
  keyResultID?: KeyResult['id']
  onCompleted?: (data: KeyResultCheckIn) => void
}

const KeyResultSectionAddCheckIn = ({
  keyResultID,
  onCompleted,
}: KeyResultSectionAddCheckInProperties) => {
  const [isOpen, setIsOpen] = useState(false)
  const latestKeyResultCheckIn = useRecoilValue(selectLatestCheckIn(keyResultID))
  const setDraftValue = useSetRecoilState(keyResultCheckInProgressDraft(keyResultID))
  const intl = useIntl()

  const isLoaded = typeof latestKeyResultCheckIn?.value !== 'undefined'

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setDraftValue(latestKeyResultCheckIn?.value)
  }

  const handleSubmit = (values: CheckInFormValues) => {
    if (values.valueNew) setDraftValue(values.valueNew)
    setIsOpen(false)
  }

  return (
    <Flex direction="column" gridGap={4}>
      <Skeleton isLoaded={isLoaded}>
        <Button
          variant="solid"
          w="100%"
          colorScheme={isOpen ? 'gray' : 'brand'}
          onClick={isOpen ? handleClose : handleOpen}
        >
          {intl.formatMessage(isOpen ? messages.buttonLabelClose : messages.buttonLabelOpen)}
        </Button>
      </Skeleton>
      <Collapse animateOpacity in={isOpen} style={{ overflow: 'visible' }}>
        <KeyResultSectionTimelineCardBase>
          <Flex pb={4}>
            <Heading fontSize="md" fontWeight={700} color="black.600" flexGrow={1}>
              {intl.formatMessage(messages.formTitle)}
            </Heading>
          </Flex>

          <CheckInForm
            showGoal
            isCommentAlwaysEnabled
            keyResultID={keyResultID}
            afterSubmit={handleSubmit}
            onCompleted={onCompleted}
          />
        </KeyResultSectionTimelineCardBase>
      </Collapse>
    </Flex>
  )
}

export default KeyResultSectionAddCheckIn
