import { ParsedUrlQuery } from 'querystring'

import { Collapse, Stack, Skeleton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import { IntlLink } from 'src/components/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import { useTeamTasksData } from 'src/components/TaskManagement/hooks/new-task/use-get-team-tasks'
import { TASK_STATUS } from 'src/services/new-task-management/@types/task-status.enum'
import { Task } from 'src/services/new-task-management/@types/task.type'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import {
  keyResultCheckInCommentEnabled,
  keyResultCheckInProgressDraft,
  keyResultLatestCheckIn,
} from 'src/state/recoil/key-result/check-in'
import isCheckInModalOpenAtom from 'src/state/recoil/key-result/check-in/is-check-in-modal-open'
import { draftCheckMarksAtom } from 'src/state/recoil/key-result/checklist'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'
import { isKeyResultListOpenAtom } from 'src/state/recoil/key-result/key-result-list'
import { createdByCheckInNotificationAtom } from 'src/state/recoil/notifications'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import { OptionBarWrapper } from './OptionBar/wrapper'
import { KeyResultChecklist } from './checklist'
import messages from './messages'
import { ToggleCollapse } from './toggle-collapse'

interface KeyResultChecklistWrapperProperties {
  keyResultID?: string
  isLoading?: boolean
}

export const KeyResultChecklistWrapper = ({
  keyResultID,
  isLoading,
}: KeyResultChecklistWrapperProperties) => {
  const timelineSelector = buildPartialSelector<KeyResult['timeline']>('timeline')

  // Unnecessary code to resolve the ugly global state usage
  const resetOpenDrawer = useResetRecoilState(keyResultReadDrawerOpenedKeyResultID)
  const resetTimeline = useResetRecoilState(timelineSelector(keyResultID))
  const resetCommentEnabled = useResetRecoilState(keyResultCheckInCommentEnabled(keyResultID))
  const resetCheckmarkDrafts = useResetRecoilState(draftCheckMarksAtom(keyResultID))
  const latestKeyResultCheckIn = useRecoilValue(keyResultLatestCheckIn(keyResultID))
  const setDraftValue = useSetRecoilState(keyResultCheckInProgressDraft(keyResultID))
  const setIsCheckInModalOpen = useSetRecoilState(isCheckInModalOpenAtom)
  const setCreatedByNotification = useSetRecoilState(createdByCheckInNotificationAtom)
  const setHiddingModal = useSetRecoilState(isKeyResultListOpenAtom)

  const [progress, setProgress] = useState({ total: 0, numberOfDone: 0, progress: 0 })
  const [isChecklistOpen, setIsChecklistOpen] = useState(false)

  const intl = useIntl()

  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))
  const hasData = Boolean(keyResult?.teamId)

  const toggleChecklistCollapse = () => {
    setIsChecklistOpen((previous) => !previous)
  }

  const {
    data: tasks = [],
    isFetching,
    isSuccess,
    refetch,
  } = useTeamTasksData({ key_result_id__id: keyResultID } as ParsedUrlQuery)

  const handleChecklistCreation = () => {
    refetch()
    if (!isChecklistOpen) setIsChecklistOpen(true)
  }

  const hasItems = tasks.length > 0

  const canCreate = !hasItems

  useEffect(() => {
    if (keyResultID) refetch()
  }, [keyResultID, refetch])

  useEffect(() => {
    const numberOfDone = tasks.filter((task: Task) => task.status === TASK_STATUS.done).length
    if (isFetching && tasks.length === 0) {
      setProgress({ total: 0, numberOfDone: 0, progress: 0 })
    }

    setProgress({
      total: tasks.length,
      numberOfDone,
      progress: (numberOfDone / tasks.length) * 100,
    })
  }, [isFetching, tasks, tasks.length])

  const handleClose = () => {
    resetOpenDrawer()
    resetTimeline()
    resetCommentEnabled()
    resetCheckmarkDrafts()
    setDraftValue(latestKeyResultCheckIn?.value)
    setIsCheckInModalOpen(false)
    setIsChecklistOpen(false)
    setCreatedByNotification(false)
    setHiddingModal(false)
  }

  return (
    <Stack spacing={0}>
      <Stack direction="row" alignItems="flex-start" position="relative">
        <IntlLink
          href={
            keyResult?.teamId && keyResultID
              ? `/explore/${keyResult?.teamId}?activeTab=tasks&key_result_id__id=${keyResultID}`
              : '#'
          }
          onClick={handleClose}
        >
          <span style={{ display: 'flex', alignItems: 'baseline' }}>
            <KeyResultSectionHeading mt="0.3rem" textDecoration="underline" mr="4px">
              {intl.formatMessage(messages.heading)}
            </KeyResultSectionHeading>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="7"
              viewBox="0 0 6 7"
              fill="none"
            >
              <path
                d="M6 0.881836V6.39914H4.9918V2.61911L0.724748 6.88184L0.665866 6.86992L0 6.19621L4.26518 1.89145H0.490787V0.881836H6Z"
                fill="#525F7F"
              />
            </svg>
          </span>
        </IntlLink>
        <Skeleton isLoaded={isLoading}>
          <OptionBarWrapper
            keyResultID={keyResultID}
            progress={progress}
            canCreate={canCreate}
            onCreate={handleChecklistCreation}
          />
          {hasItems && (
            <ToggleCollapse isOpen={isChecklistOpen} onToggle={toggleChecklistCollapse} />
          )}
        </Skeleton>
      </Stack>
      {isSuccess ? (
        <Collapse in={isChecklistOpen}>
          <KeyResultChecklist
            nodes={tasks}
            keyResultID={keyResultID}
            canCreate={!canCreate}
            teamId={keyResult?.teamId}
            onUpdate={refetch}
          />
        </Collapse>
      ) : undefined}
    </Stack>
  )
}
