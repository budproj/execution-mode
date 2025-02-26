import { useCallback, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  TaskInsert,
  Task,
  Task as TaskModel,
  TASK_STATUS as ColumnType,
} from 'src/services/new-task-management/new-task-management.service'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { taskInsertDrawerTeamID } from 'src/state/recoil/task-management/drawers/insert/task-insert-drawer'
import meAtom from 'src/state/recoil/user/me'

import { useAddTeamTask } from '../../hooks/new-task/use-add-task'
import { useDeleteTask } from '../../hooks/new-task/use-delete-task'
import { useUpdateTask } from '../../hooks/new-task/use-update-task'
import { swap } from '../utils/helpers'

const useColumnTasks = (column: ColumnType, teamId: string) => {
  const { dispatch } = useEvent(EventType.TASK_MANAGER_CREATE_TASK_CLICK)
  const { mutate } = useAddTeamTask(teamId)

  const { mutate: updateTaskMutate } = useUpdateTask()
  const { mutate: removeTaskMutate } = useDeleteTask()

  const [columnTasks, setColumnTasks] = useState<Task[]>([])

  const myID = useRecoilValue(meAtom)
  const setTaskTeamId = useSetRecoilState(taskInsertDrawerTeamID)

  const addTask = useCallback(
    (task: TaskInsert) => {
      dispatch({ taskData: task })
      mutate(task)
    },
    [dispatch, mutate],
  )

  const openInsertDrawerTask = useCallback(() => {
    setTaskTeamId({ teamId, column })
  }, [teamId, column, setTaskTeamId])

  const addEmptyTask = useCallback(() => {
    addTask({
      status: column,
      title: `Nova tarefa`,
      team: teamId,
      orderindex: 0,
      cycle: undefined,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
      initialDate: new Date(),
      dueDate: new Date(),
      priority: 1,
      owner: myID,
      attachments: [],
      supportTeam: [],
      tags: [],
      active: true,
    })
  }, [addTask, column, myID, teamId])

  const deleteTask = useCallback(
    (id: TaskModel['id']) => {
      removeTaskMutate({ teamId, taskId: id })
    },
    [removeTaskMutate, teamId],
  )

  const updateTask = useCallback(
    (id: TaskModel['id'], teamId: string, updatedTask: Partial<TaskModel>) => {
      updateTaskMutate({ teamId, taskId: id, data: updatedTask })
    },
    [updateTaskMutate],
  )

  const dropTaskFrom = useCallback(
    (id: TaskModel['id']) => {
      updateTaskMutate({ teamId, taskId: id, data: { status: column } })
    },
    [column, updateTaskMutate, teamId],
  )

  // const swapTasks = useCallback(
  //   (index: number, index_: number) => {
  //     setColumnTasks((allTasks) => {
  //       return swap(allTasks, index, index_)
  //     })

  //     const order = columnTasks.map((task) => task.id)

  //     //updateBoardMutate({ boardId: boardID, column, order })
  //   },
  //   [boardID, column, columnTasks, updateBoardMutate],
  // )

  return {
    addEmptyTask,
    openInsertDrawerTask,
    addTask,
    updateTask,
    dropTaskFrom,
    deleteTask,
    columnTasks,
    setColumnTasks,
  }
}

export default useColumnTasks
