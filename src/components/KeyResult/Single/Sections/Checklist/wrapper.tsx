import { useLazyQuery } from '@apollo/client'
import { Collapse, Stack } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { KeyResultCheckMark } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { keyResultChecklistAtom } from 'src/state/recoil/key-result/checklist'

import { EventType } from '../../../../../state/hooks/useEvent/event-type'
import { Feature } from '../../../../../state/hooks/useEvent/feature'
import { useEvent } from '../../../../../state/hooks/useEvent/hook'
import { KeyResultSectionHeading } from '../Heading/wrapper'

import { OptionBarWrapper } from './OptionBar/wrapper'
import { KeyResultChecklist } from './checklist'
import messages from './messages'
import queries from './queries.gql'
import { ToggleCollapse } from './toggle-collapse'

interface KeyResultChecklistWrapperProperties {
  keyResultID?: string
}

export const KeyResultChecklistWrapper = ({ keyResultID }: KeyResultChecklistWrapperProperties) => {
  const { dispatch } = useEvent(EventType.OPENED_KEY_RESULT_CHECKLIST, {
    feature: Feature.CHECK_MARK,
  })
  const [isChecklistOpen, setIsChecklistOpen] = useState(false)
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
  const hasItems = checklist.length > 0

  const refreshChecklist = useCallback(() => {
    getChecklist({
      variables: {
        id: keyResultID,
      },
    })
  }, [getChecklist, keyResultID])

  const toggleChecklistCollapse = () => {
    if (!isChecklistOpen) dispatch({ keyResultID })

    setIsChecklistOpen(!isChecklistOpen)
  }

  const handleChecklistCreation = () => {
    refreshChecklist()
    if (!isChecklistOpen) setIsChecklistOpen(true)
  }

  useEffect(() => {
    if (called && !loading) updateChecklistEdges(keyResultChecklist?.edges)
  }, [called, loading, keyResultChecklist, updateChecklistEdges])

  useEffect(() => {
    if (keyResultID) refreshChecklist()
  }, [keyResultID, refreshChecklist])

  return (
    <Stack spacing={0}>
      <Stack direction="row" alignItems="center">
        <KeyResultSectionHeading>{intl.formatMessage(messages.heading)}</KeyResultSectionHeading>
        <OptionBarWrapper
          keyResultID={keyResultID}
          progress={keyResultChecklist?.progress}
          canCreate={canCreate}
          onCreate={handleChecklistCreation}
        />
        {hasItems && <ToggleCollapse isOpen={isChecklistOpen} onToggle={toggleChecklistCollapse} />}
      </Stack>
      {isChecklistLoaded ? (
        <Collapse in={isChecklistOpen}>
          <KeyResultChecklist
            nodes={checklist}
            keyResultID={keyResultID}
            canCreate={canCreate}
            onCreateCheckmark={refreshChecklist}
          />
        </Collapse>
      ) : (
        ''
      )}
    </Stack>
  )
}
