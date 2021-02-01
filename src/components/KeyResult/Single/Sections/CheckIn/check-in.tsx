import { Skeleton, Button, Collapse, Flex, Heading, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import CloseIcon from 'src/components/Icon/Close'
import CheckInForm from 'src/components/KeyResult/CheckInForm'
import { KeyResult } from 'src/components/KeyResult/types'
import { USER_POLICY } from 'src/components/User/constants'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import { KeyResultSectionTimelineCardBase } from '../Timeline/Cards'

import messages from './messages'

export interface KeyResultSectionCheckInProperties {
  keyResultID?: KeyResult['id']
}

const policiesSelector = buildPartialSelector<KeyResult['policies']>('policies')

const KeyResultSectionCheckIn = ({ keyResultID }: KeyResultSectionCheckInProperties) => {
  const policies = useRecoilValue(policiesSelector(keyResultID))
  const [isOpen, setIsOpen] = useState(false)
  const intl = useIntl()

  const isLoaded = typeof keyResultID !== 'undefined' && typeof policies !== 'undefined'
  const canUpdate = policies?.update === USER_POLICY.ALLOW || !isLoaded

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
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
