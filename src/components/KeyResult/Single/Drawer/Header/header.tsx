import { Box, DrawerHeader, useTheme, Collapse, Button } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { KeyResultSectionAddCheckIn } from 'src/components/KeyResult/Single/Sections'
import KeyResultSingleTitle from 'src/components/KeyResult/Single/Sections/Title'
import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import { authzPoliciesKeyResult } from 'src/state/recoil/authz/policies'
import { AUTHZ_POLICY } from 'src/state/recoil/authz/policies/constants'
import {
  keyResultDrawerIsCreatingCheckIn,
  keyResultDrawerIsScrolling,
} from 'src/state/recoil/key-result/drawer'
import selectLatestTimelineEntry from 'src/state/recoil/key-result/timeline/latest-entry'

import KeyResultDrawerDeleteAlert from './DeleteAlert'
import messages from './messages'

export interface KeyResultDrawerHeaderProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultDrawerHeader = ({ keyResultID }: KeyResultDrawerHeaderProperties) => {
  const intl = useIntl()
  const [isCreatingCheckIn, setIsCreatingCheckIn] = useRecoilState(
    keyResultDrawerIsCreatingCheckIn(keyResultID),
  )
  const isScrolling = useRecoilValue(keyResultDrawerIsScrolling(keyResultID))
  const keyResultPolicies = useRecoilValue(authzPoliciesKeyResult(keyResultID))
  const setLatestTimelineEntry = useSetRecoilState(selectLatestTimelineEntry(keyResultID))
  const theme = useTheme()

  const policies = keyResultPolicies.childEntities.keyResultCheckIn

  const isNotScrollingOrAskedToCheckIn = !isScrolling || isCreatingCheckIn
  const canUpdate = policies?.create === AUTHZ_POLICY.ALLOW
  const shouldShowCheckIn = canUpdate && isNotScrollingOrAskedToCheckIn

  const handleCheckInButtonClick = () => {
    setIsCreatingCheckIn(true)
  }

  const handleCheckInCompleted = (data: KeyResultCheckIn) => {
    setLatestTimelineEntry(data)
  }

  return (
    <Box position="sticky" top={0} bg="white" zIndex={theme.zIndices.tooltip}>
      <DrawerHeader
        bg="gray.50"
        p={4}
        borderColor="black.300"
        borderBottomWidth={1}
        display="flex"
        alignItems="center"
        gridGap={2}
      >
        <Box flexGrow={1}>
          <KeyResultSingleTitle keyResultID={keyResultID} />
        </Box>
        <Box>
          <Collapse in={isScrolling}>
            <Button variant="solid" colorScheme="brand" px={6} onClick={handleCheckInButtonClick}>
              {intl.formatMessage(messages.checkInButtonLabel)}
            </Button>
          </Collapse>
        </Box>
      </DrawerHeader>

      <KeyResultDrawerDeleteAlert keyResultID={keyResultID} />

      <Collapse unmountOnExit in={shouldShowCheckIn} style={{ overflow: 'visible' }}>
        <Box p={4} pb={0}>
          <KeyResultSectionAddCheckIn
            keyResultID={keyResultID}
            onCompleted={handleCheckInCompleted}
          />
        </Box>
      </Collapse>
    </Box>
  )
}

export default KeyResultDrawerHeader
