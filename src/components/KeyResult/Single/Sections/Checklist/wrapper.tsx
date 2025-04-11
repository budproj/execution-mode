import { ParsedUrlQuery } from 'querystring'

import { Collapse, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { useTeamTasksData } from 'src/components/TaskManagement/hooks/new-task/use-get-team-tasks'
import { TASK_STATUS, Task } from 'src/services/new-task-management/new-task-management.service'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import { OptionBarWrapper } from './OptionBar/wrapper'
import { KeyResultChecklist } from './checklist'
import messages from './messages'
import { ToggleCollapse } from './toggle-collapse'

interface KeyResultChecklistWrapperProperties {
  keyResultID?: string
}

export const KeyResultChecklistWrapper = ({ keyResultID }: KeyResultChecklistWrapperProperties) => {
  const [progress, setProgress] = useState({ total: 0, numberOfDone: 0, progress: 0 })
  const [isChecklistOpen, setIsChecklistOpen] = useState(false)

  const intl = useIntl()
  const router = useRouter()
  const { id } = router.query

  const toggleChecklistCollapse = () => {
    setIsChecklistOpen((previous) => !previous)
  }

  const handleChecklistCreation = () => {
    refetch()
    if (!isChecklistOpen) setIsChecklistOpen(true)
  }

  const {
    data: tasks = [],
    isFetching,
    isSuccess,
    refetch,
  } = useTeamTasksData({ teamId: id as string, kr: keyResultID } as ParsedUrlQuery)

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
  }, [isFetching, tasks.length])

  return (
    <Stack spacing={0}>
      <Stack direction="row" alignItems="flex-start" position="relative">
        <KeyResultSectionHeading mt="0.3rem">
          {intl.formatMessage(messages.heading)}
        </KeyResultSectionHeading>
        <OptionBarWrapper
          keyResultID={keyResultID}
          progress={progress}
          canCreate={canCreate}
          onCreate={handleChecklistCreation}
        />
        {hasItems && <ToggleCollapse isOpen={isChecklistOpen} onToggle={toggleChecklistCollapse} />}
      </Stack>
      {isSuccess ? (
        <Collapse in={isChecklistOpen}>
          <KeyResultChecklist
            nodes={tasks}
            keyResultID={keyResultID}
            canCreate={!canCreate}
            onUpdate={refetch}
          />
        </Collapse>
      ) : undefined}
    </Stack>
  )
}
