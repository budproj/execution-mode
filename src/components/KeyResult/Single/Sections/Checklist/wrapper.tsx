import { Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import messages from './messages'

interface KeyResultChecklistWrapperProperties {
  keyResultID?: string
  isLoading?: boolean
}

export const KeyResultChecklistWrapper = ({
  keyResultID,
  isLoading,
}: KeyResultChecklistWrapperProperties) => {
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))
  const [checklist, updateChecklistEdges, _, isChecklistLoaded] = useConnectionEdges(
    keyResult?.checkList?.edges,
  )
  const intl = useIntl()

  useEffect(() => {
    updateChecklistEdges(keyResult?.checkList?.edges)
  }, [keyResult, updateChecklistEdges])

  return (
    <Stack>
      <KeyResultSectionHeading>{intl.formatMessage(messages.heading)}</KeyResultSectionHeading>
    </Stack>
  )
}
