import { useCallback, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { Except } from 'src/helpers/except'
import {
  Task,
  Task as TaskModel,
  TaskInsert,
  TASK_STATUS as ColumnType,
} from 'src/services/task-management/task-management.service'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { taskInsertDrawerTeamID } from 'src/state/recoil/task-management/drawers/insert/task-insert-drawer'
import meAtom from 'src/state/recoil/user/me'

import { useAddTask } from '../../hooks/use-add-task'
import { useRemoveTaskMutate } from '../../hooks/use-remove-task-mutate'
import { BOARD_DOMAIN } from '../../hooks/use-team-tasks-board-data'
import { useUpdateBoardMutate } from '../../hooks/use-update-board-mutate'
import { useUpdateTaskMutate } from '../../hooks/use-update-task-mutate'
import { swap } from '../utils/helpers'
import { debug } from '../utils/logging'

const useColumnTasks = (
  column: ColumnType,
  boardID: string,
  domain: BOARD_DOMAIN,
  identifier: string,
) => {
  const { dispatch } = useEvent(EventType.TASK_MANAGER_CREATE_TASK_CLICK)
  const { mutate } = useAddTask(domain, identifier)
  const { mutate: updateTaskMutate } = useUpdateTaskMutate(domain, identifier)
  const { mutate: updateBoardMutate } = useUpdateBoardMutate()
  const { mutate: removeTaskMutate } = useRemoveTaskMutate(domain, identifier)

  const [columnTasks, setColumnTasks] = useState<Task[]>([])

  const myID = useRecoilValue(meAtom)
  const setTaskBoardID = useSetRecoilState(taskInsertDrawerTeamID)

  const addTask = useCallback(
    (task: TaskInsert) => {
      dispatch({ taskData: task })
      debug(`Adding new task to ${column} column`)
      mutate(task)
    },
    [column, mutate],
  )

  const openInsertDrawerTask = useCallback(() => {
    setTaskBoardID({ boardID, column, domain, identifier })
  }, [boardID, column, domain, identifier, setTaskBoardID])

  const addEmptyTask = useCallback(() => {
    debug(`Adding new empty task to ${column} column`)
    addTask({
      boardId: boardID,
      status: column,
      title: `Nova tarefa`,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
      initialDate: new Date(),
      dueDate: new Date(),
      priority: Math.floor(Math.random() * 4) + 1,
      owner: myID,
      attachments: [],
      supportTeamMembers: [],
      tags: [],
    })
  }, [addTask, boardID, column, myID])

  const deleteTask = useCallback(
    (_id: TaskModel['_id']) => {
      debug(`Removing task ${_id}..`)
      removeTaskMutate(_id)
    },
    [removeTaskMutate],
  )

  const updateTask = useCallback(
    (_id: TaskModel['_id'], updatedTask: Except<Partial<TaskModel>, '_id'>) => {
      debug(`Updating task ${_id} with ${JSON.stringify(updateTask)}`)
      updateTaskMutate(updatedTask)
    },
    [updateTaskMutate],
  )

  const dropTaskFrom = useCallback(
    (from: ColumnType, _id: TaskModel['_id']) => {
      debug(`Moving task ${_id} from ${from} to ${column}`)
      updateTaskMutate({ _id, status: column })
    },
    [column, updateTaskMutate],
  )

  const swapTasks = useCallback(
    (index: number, index_: number) => {
      debug(`Swapping task ${index} with ${index_} in ${column} column`)
      setColumnTasks((allTasks) => {
        return swap(allTasks, index, index_)
      })

      const order = columnTasks.map((task) => task._id)

      updateBoardMutate({ boardId: boardID, column, order })
    },
    [boardID, column, columnTasks, updateBoardMutate],
  )

  return {
    addEmptyTask,
    openInsertDrawerTask,
    addTask,
    updateTask,
    dropTaskFrom,
    deleteTask,
    swapTasks,
    columnTasks,
    setColumnTasks,
  }
}

export default useColumnTasks
