import { useCallback, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { Except } from 'src/helpers/except'
import {
  Task,
  Task as TaskModel,
  TaskInsert,
  TASK_STATUS as ColumnType,
} from 'src/services/task-management/task-management.service'
import { taskInsertDrawerTeamID } from 'src/state/recoil/task-management/drawers/insert/task-insert-drawer'

import { useAddTask } from '../../hooks/use-add-task'
import { BOARD_DOMAIN } from '../../hooks/use-team-tasks-board-data'
import { swap } from '../utils/helpers'
import { debug } from '../utils/logging'

const MAX_TASK_PER_COLUMN = 100

const useColumnTasks = (
  column: ColumnType,
  boardID: string,
  domain: BOARD_DOMAIN,
  identifier: string,
) => {
  // Const [tasks, setTasks] = useState<Record<key typeof ColumnType, Task[]>>()
  const { mutate } = useAddTask(domain, identifier)
  const [tasks, setTasks] = useState<Record<ColumnType, Task[]>>({
    pending: [],
    doing: [],
    done: [],
    toDo: [],
  })
  // Const teamUsers = useRecoilValue(filteredUsersCompany(teamId))
  const setTaskBoardID = useSetRecoilState(taskInsertDrawerTeamID)

  // TODO: only for tests
  // const randomUser = Math.floor(Math.random() * teamUsers.length)

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

  const addEmptyTask = useCallback(() => {
    debug(`Adding new empty task to ${column} column`)
    setTaskBoardID({ boardID, column, domain, identifier })
    // SetTasks((allTasks) => {
    //   const columnTasks = allTasks[column]

    //   if (columnTasks.length > MAX_TASK_PER_COLUMN) {
    //     debug('Too many task!')
    //     return allTasks
    //   }

    //   const newColumnTask: TaskModel = {
    //     id: uuidv4(),
    //     boardId,
    //     status: TASK_STATUS[column],
    //     title: `New ${column} task`,
    //     description:
    //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
    //     dueDate: new Date(),
    //     priority: Math.floor(Math.random() * 4) + 1,
    //     owner: teamUsers[randomUser].id,
    //     attachments: [],
    //     supportTeamMembers: [],
    //     tags: ['PRODUTO'],
    //   }

    //   return {
    //     ...allTasks,
    //     [column]: [newColumnTask, ...columnTasks],
    //   }
    // })
  }, [boardID, column, setTaskBoardID])

  const deleteTask = useCallback(
    (id: TaskModel['id']) => {
      debug(`Removing task ${id}..`)
      setTasks((allTasks) => {
        const columnTasks = allTasks[column]
        return {
          ...allTasks,
          [column]: columnTasks.filter((task) => task.id !== id),
        }
      })
    },
    [column, setTasks],
  )

  const updateTask = useCallback(
    (id: TaskModel['id'], updatedTask: Except<Partial<TaskModel>, 'id'>) => {
      debug(`Updating task ${id} with ${JSON.stringify(updateTask)}`)
      setTasks((allTasks) => {
        const columnTasks = allTasks[column]
        return {
          ...allTasks,
          [column]: columnTasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task,
          ),
        }
      })
    },
    [column, setTasks],
  )

  const dropTaskFrom = useCallback(
    (from: ColumnType, id: TaskModel['id']) => {
      setTasks((allTasks) => {
        const fromColumnTasks = allTasks[from]
        const toColumnTasks = allTasks[column]
        const movingTask = fromColumnTasks.find((task) => task.id === id)

        debug(`Moving task ${movingTask?.id ?? ''} from ${from} to ${column}`)

        if (!movingTask) {
          return allTasks
        }

        // Remove the task from the original column and copy it within the destination column
        return {
          ...allTasks,
          [from]: fromColumnTasks.filter((task) => task.id !== id),
          [column]: [{ ...movingTask, status: column }, ...toColumnTasks],
        }
      })
    },
    [column, setTasks],
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
    addTask,
    updateTask,
    dropTaskFrom,
    deleteTask,
    swapTasks,
  }
}

export default useColumnTasks
