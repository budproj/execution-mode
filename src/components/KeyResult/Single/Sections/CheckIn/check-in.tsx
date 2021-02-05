import { Skeleton, Button, Collapse, Flex, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import CheckInForm from 'src/components/KeyResult/CheckInForm'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultCheckInProgressDraft } from 'src/state/recoil/key-result/check-in'
import { selectCurrentProgress } from 'src/state/recoil/key-result/selectors'

import { KeyResultSectionTimelineCardBase } from '../Timeline/Cards'

import messages from './messages'

export interface KeyResultSectionCheckInProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultSectionCheckIn = ({ keyResultID }: KeyResultSectionCheckInProperties) => {
  const [isOpen, setIsOpen] = useState(false)
  const currentProgress = useRecoilValue(selectCurrentProgress(keyResultID))
  const setDraftValue = useSetRecoilState(keyResultCheckInProgressDraft(keyResultID))
  const intl = useIntl()

  const isLoaded = typeof currentProgress !== 'undefined'

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setDraftValue(currentProgress)
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
      <Collapse animateOpacity in={isOpen}>
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
          />
        </KeyResultSectionTimelineCardBase>
      </Collapse>
    </Flex>
  )
}

export default KeyResultSectionCheckIn
