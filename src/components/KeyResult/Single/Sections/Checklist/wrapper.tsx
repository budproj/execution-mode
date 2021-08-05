import { useLazyQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { KeyResultCheckMark } from 'src/components/KeyResult/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { keyResultChecklistAtom } from 'src/state/recoil/key-result/checklist'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import { OptionBarWrapper } from './OptionBar/wrapper'
import { KeyResultChecklist } from './checklist'
import messages from './messages'
import queries from './queries.gql'
import { KeyResultChecklistSkeleton } from './skeleton'

interface KeyResultChecklistWrapperProperties {
  keyResultID?: string
}

export const KeyResultChecklistWrapper = ({ keyResultID }: KeyResultChecklistWrapperProperties) => {
  const [keyResultChecklist, setKeyResultChecklist] = useRecoilState(
    keyResultChecklistAtom(keyResultID),
  )
  const [checklist, updateChecklistEdges, _, isChecklistLoaded] =
    useConnectionEdges<KeyResultCheckMark>()
  const intl = useIntl()
  const [getChecklist, { called, loading }] = useLazyQuery(queries.GET_CHECKLIST_OF_KEY_RESULT, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setKeyResultChecklist(data.keyResult.checkList)
    },
  })

  const isLoading = (called && loading) || !isChecklistLoaded

  useEffect(() => {
    updateChecklistEdges(keyResultChecklist?.edges)
  }, [keyResultChecklist, updateChecklistEdges])

  useEffect(() => {
    if (keyResultID)
      getChecklist({
        variables: {
          id: keyResultID,
        },
      })
  }, [keyResultID, getChecklist])

  return (
    <Stack>
      <Stack direction="row" alignItems="center">
        <KeyResultSectionHeading>{intl.formatMessage(messages.heading)}</KeyResultSectionHeading>
        <OptionBarWrapper progress={keyResultChecklist?.progress} />
      </Stack>
      {isLoading ? <KeyResultChecklistSkeleton /> : <KeyResultChecklist nodes={checklist} />}
    </Stack>
  )
}
