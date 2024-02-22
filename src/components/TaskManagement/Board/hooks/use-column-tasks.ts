import { useCallback, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { Except } from 'src/helpers/except'
import {
  Task,
  Task as TaskModel,
  TaskInsert,
  TASK_STATUS as ColumnType,
} from 'src/services/task-management/task-management.service'
import { taskInsertDrawerTeamID } from 'src/state/recoil/task-management/drawers/insert/task-insert-drawer'
import meAtom from 'src/state/recoil/user/me'

import { useAddTask } from '../../hooks/use-add-task'
import { BOARD_DOMAIN } from '../../hooks/use-team-tasks-board-data'
import { useUpdateTaskMutate } from '../../hooks/use-update-task-mutate'
import { swap } from '../utils/helpers'
import { debug } from '../utils/logging'

const useColumnTasks = (
  column: ColumnType,
  boardID: string,
  domain: BOARD_DOMAIN,
  identifier: string,
) => {
  // Const [tasks, setTasks] = useState<Record<key typeof ColumnType, Task[]>>()
  const { mutate } = useAddTask(domain, identifier)
  const { mutate: updateTaskMutate } = useUpdateTaskMutate(domain, identifier)
  const [tasks, setTasks] = useState<Record<ColumnType, Task[]>>({
    pending: [],
    doing: [],
    done: [],
    toDo: [],
  })
  const myID = useRecoilValue(meAtom)
  const setTaskBoardID = useSetRecoilState(taskInsertDrawerTeamID)

  const columnTasks = tasks[column]

  const addTask = useCallback(
    (task: TaskInsert) => {
      debug(`Adding new task to ${column} column`)
      mutate(task)
      // SetTasks((allTasks) => {
      //   const columnTasks = allTasks[column]

      //   if (columnTasks.length > MAX_TASK_PER_COLUMN) {
      //     debug('Too many task!')
      //     return allTasks
      //   }

      //   return {
      //     ...allTasks,
      //     [column]: [task, ...columnTasks],
      //   }
      // })
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
      setTasks((allTasks) => {
        const columnTasks = allTasks[column]
        return {
          ...allTasks,
          [column]: columnTasks.filter((task) => task._id !== _id),
        }
      })
    },
    [column, setTasks],
  )

  const updateTask = useCallback(
    (_id: TaskModel['_id'], updatedTask: Except<Partial<TaskModel>, '_id'>) => {
      debug(`Updating task ${_id} with ${JSON.stringify(updateTask)}`)
      // SetTasks((allTasks) => {
      //   const columnTasks = allTasks[column]
      //   return {
      //     ...allTasks,
      //     [column]: columnTasks.map((task) =>
      //       task._id === _id ? { ...task, ...updatedTask } : task,
      //     ),
      //   }
      // })
      updateTaskMutate(updatedTask)
    },
    [updateTaskMutate],
  )

  const dropTaskFrom = useCallback(
    (from: ColumnType, _id: TaskModel['_id']) => {
      debug(`Moving task ${_id} from ${from} to ${column}`)
      updateTaskMutate({ _id, status: column })
      // SetTasks((allTasks) => {
      //   const fromColumnTasks = allTasks[from]
      //   const toColumnTasks = allTasks[column]
      //   const movingTask = fromColumnTasks.find((task) => task.id === id)

      //   if (!movingTask) {
      //     return allTasks
      //   }

      //   // Remove the task from the original column and copy it within the destination column
      //   return {
      //     ...allTasks,
      //     [from]: fromColumnTasks.filter((task) => task.id !== id),
      //     [column]: [{ ...movingTask, status: column }, ...toColumnTasks],
      //   }
      // })
    },
    [column, updateTaskMutate],
  )

  const swapTasks = useCallback(
    (index: number, index_: number) => {
      debug(`Swapping task ${index} with ${index_} in ${column} column`)
      setTasks((allTasks) => {
        const columnTasks = allTasks[column]
        return {
          ...allTasks,
          [column]: swap(columnTasks, index, index_),
        }
      })
    },
    [column, setTasks],
  )

  return {
    tasks: columnTasks,
    addEmptyTask,
    openInsertDrawerTask,
    addTask,
    updateTask,
    dropTaskFrom,
    deleteTask,
    swapTasks,
  }
}

export default useColumnTasks
