import { useLazyQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/react'
import React, { useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { KeyResultCheckMark } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
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

  const canCreate = keyResultChecklist?.policy?.create === GraphQLEffect.ALLOW
  const refreshChecklist = useCallback(() => {
    getChecklist({
      variables: {
        id: keyResultID,
      },
    })
  }, [getChecklist, keyResultID])

  useEffect(() => {
    if (called && !loading) updateChecklistEdges(keyResultChecklist?.edges)
  }, [called, loading, keyResultChecklist, updateChecklistEdges])

  useEffect(() => {
    if (keyResultID) refreshChecklist()
  }, [keyResultID, refreshChecklist])

  return (
    <Stack>
      <Stack direction="row" alignItems="center">
        <KeyResultSectionHeading>{intl.formatMessage(messages.heading)}</KeyResultSectionHeading>
        <OptionBarWrapper
          progress={keyResultChecklist?.progress}
          refresh={refreshChecklist}
          keyResultID={keyResultID}
          canCreate={canCreate}
        />
      </Stack>
      {isChecklistLoaded ? (
        <KeyResultChecklist
          nodes={checklist}
          refresh={refreshChecklist}
          keyResultID={keyResultID}
          canCreate={canCreate}
        />
      ) : (
        <KeyResultChecklistSkeleton />
      )}
    </Stack>
  )
}
