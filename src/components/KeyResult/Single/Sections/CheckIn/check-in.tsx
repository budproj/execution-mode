import { Skeleton, Button, Collapse, Flex, Heading, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import CloseIcon from 'src/components/Icon/Close'
import CheckInForm from 'src/components/KeyResult/CheckInForm'
import { KeyResult } from 'src/components/KeyResult/types'
import { AUTHZ_POLICY } from 'src/state/recoil/authz/policies/constants'
import authzPoliciesKeyResult from 'src/state/recoil/authz/policies/key-result'
import { keyResultCheckInProgressDraft } from 'src/state/recoil/key-result/check-in'
import { selectCurrentProgress } from 'src/state/recoil/key-result/selectors'

import { KeyResultSectionTimelineCardBase } from '../Timeline/Cards'

import messages from './messages'

export interface KeyResultSectionCheckInProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultSectionCheckIn = ({ keyResultID }: KeyResultSectionCheckInProperties) => {
  const [isOpen, setIsOpen] = useState(false)
  const keyResultPolicies = useRecoilValue(authzPoliciesKeyResult(keyResultID))
  const currentProgress = useRecoilValue(selectCurrentProgress(keyResultID))
  const setDraftValue = useSetRecoilState(keyResultCheckInProgressDraft(keyResultID))
  const intl = useIntl()

  const policies = keyResultPolicies.childEntities.keyResultCheckIn
  const isLoaded = typeof currentProgress !== 'undefined'
  const canUpdate = !isLoaded || policies?.create === AUTHZ_POLICY.ALLOW

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setDraftValue(currentProgress)
  }

  return canUpdate ? (
    <Skeleton isLoaded={isLoaded}>
      <Collapse animateOpacity in={!isOpen}>
        <Button variant="outline" w="100%" borderRadius="full" onClick={handleOpen}>
          {intl.formatMessage(messages.button)}
        </Button>
      </Collapse>
      <Collapse animateOpacity in={isOpen}>
        <KeyResultSectionTimelineCardBase>
          <Flex>
            <Heading fontSize="18px" fontWeight={700} color="gray.600" flexGrow={1}>
              {intl.formatMessage(messages.formTitle)}
            </Heading>

            <IconButton
              aria-label={intl.formatMessage(messages.closeIconAlt)}
              icon={
                <CloseIcon
                  title={intl.formatMessage(messages.closeIconTitle)}
                  desc={intl.formatMessage(messages.closeIconAlt)}
                  fill="gray.200"
                />
              }
              onClick={handleClose}
            />
          </Flex>

          <CheckInForm
            showGoal
            isCommentAlwaysEnabled
            keyResultID={keyResultID}
            afterSubmit={handleClose}
            onCancel={handleClose}
          />
        </KeyResultSectionTimelineCardBase>
      </Collapse>
    </Skeleton>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}

export default KeyResultSectionCheckIn
