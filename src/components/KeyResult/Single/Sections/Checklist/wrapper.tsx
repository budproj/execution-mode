import { Collapse, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import { KeyResultCheckMark } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import {
  isCheckListCollapseOpenAtom,
  keyResultChecklistAtom,
} from 'src/state/recoil/key-result/checklist'

import { EventType } from '../../../../../state/hooks/useEvent/event-type'
import { Feature } from '../../../../../state/hooks/useEvent/feature'
import { useEvent } from '../../../../../state/hooks/useEvent/hook'
import useGetKeyResultWithId from '../../Drawer/hooks/get-key-result-with-id'
import { KeyResultSectionHeading } from '../Heading/wrapper'

import { OptionBarWrapper } from './OptionBar/wrapper'
import { KeyResultChecklist } from './checklist'
import messages from './messages'
import { ToggleCollapse } from './toggle-collapse'

interface KeyResultChecklistWrapperProperties {
  keyResultID?: string
}

export const KeyResultChecklistWrapper = ({ keyResultID }: KeyResultChecklistWrapperProperties) => {
  const { dispatch } = useEvent(EventType.OPENED_KEY_RESULT_CHECKLIST, {
    feature: Feature.CHECK_MARK,
  })
  const { called, loading, refetch } = useGetKeyResultWithId(keyResultID)

  const keyResultChecklist = useRecoilValue(keyResultChecklistAtom(keyResultID))
  const [checklist, updateChecklistEdges, _, isChecklistLoaded] =
    useConnectionEdges<KeyResultCheckMark>()
  const intl = useIntl()
  const [isChecklistOpen, setIsChecklistOpen] = useRecoilState(isCheckListCollapseOpenAtom)

  const canCreate = keyResultChecklist?.policy?.create === GraphQLEffect.ALLOW
  const hasItems = checklist.length > 0

  const toggleChecklistCollapse = () => {
    if (!isChecklistOpen) dispatch({ keyResultID })

    setIsChecklistOpen(!isChecklistOpen)
  }

  const handleChecklistCreation = () => {
    refetch()
    if (!isChecklistOpen) setIsChecklistOpen(true)
  }

  useEffect(() => {
    if (called && !loading) updateChecklistEdges(keyResultChecklist?.edges)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [called, loading, keyResultChecklist])

  useEffect(() => {
    if (keyResultID) refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyResultID])

  return (
    <Stack spacing={0}>
      <Stack direction="row" alignItems="flex-start" position="relative">
        <KeyResultSectionHeading mt="0.3rem">
          {intl.formatMessage(messages.heading)}
        </KeyResultSectionHeading>
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
            onUpdate={refetch}
          />
        </Collapse>
      ) : // eslint-disable-next-line unicorn/no-null
      null}
    </Stack>
  )
}
