import { ParsedUrlQuery } from 'querystring'

import { useEffect, useState } from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { useTeamTasksData } from 'src/components/TaskManagement/hooks/use-get-team-tasks'
import { TASK_STATUS } from 'src/services/task-management/@types/task-status.enum'
import { Task } from 'src/services/task-management/@types/task.type'
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

interface useLogicProperties {
  keyResultID?: string
}

export const useLogic = ({ keyResultID }: useLogicProperties) => {
  const [isChecklistOpen, setIsChecklistOpen] = useState(false)
  const [progress, setProgress] = useState({ total: 0, numberOfDone: 0, progress: 0 })

  // Fetch tasks
  const {
    data: tasks = [],
    isFetching,
    isSuccess,
    refetch,
  } = useTeamTasksData({ key_result_id: keyResultID } as ParsedUrlQuery)

  // Refetch tasks after creation
  const handleChecklistCreation = () => {
    refetch()
    if (!isChecklistOpen) setIsChecklistOpen(true)
  }

  // Change checklist state
  const toggleChecklistCollapse = () => {
    setIsChecklistOpen((previous) => !previous)
  }

  // Effect hooks
  useEffect(() => {
    // Calculate progress
    const numberOfDone = tasks.filter((task: Task) => task.status === TASK_STATUS.done).length
    if (tasks.length === 0) {
      setProgress({ total: 0, numberOfDone: 0, progress: 0 })
    } else {
      setProgress({
        total: tasks.length,
        numberOfDone,
        progress: (numberOfDone / tasks.length) * 100,
      })
    }
  }, [isFetching, tasks, tasks.length])

  // Global state management
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))

  // Global state related to the handle close action
  const timelineSelector = buildPartialSelector<KeyResult['timeline']>('timeline')
  const resetOpenDrawer = useResetRecoilState(keyResultReadDrawerOpenedKeyResultID)
  const resetTimeline = useResetRecoilState(timelineSelector(keyResultID))
  const resetCommentEnabled = useResetRecoilState(keyResultCheckInCommentEnabled(keyResultID))
  const resetCheckmarkDrafts = useResetRecoilState(draftCheckMarksAtom(keyResultID))
  const latestKeyResultCheckIn = useRecoilValue(keyResultLatestCheckIn(keyResultID))
  const setDraftValue = useSetRecoilState(keyResultCheckInProgressDraft(keyResultID))
  const setIsCheckInModalOpen = useSetRecoilState(isCheckInModalOpenAtom)
  const setCreatedByNotification = useSetRecoilState(createdByCheckInNotificationAtom)
  const setHiddingModal = useSetRecoilState(isKeyResultListOpenAtom)

  // Close Key Result Drawer
  const handleClose = () => {
    resetOpenDrawer()
    resetTimeline()
    resetCommentEnabled()
    resetCheckmarkDrafts()
    setDraftValue(latestKeyResultCheckIn?.value)
    setIsCheckInModalOpen(false)
    setCreatedByNotification(false)
    setHiddingModal(false)
  }

  return {
    keyResult,
    progress,
    tasks,
    isChecklistOpen,
    isSuccess,
    refetch,
    handleClose,
    handleChecklistCreation,
    toggleChecklistCollapse,
  }
}
