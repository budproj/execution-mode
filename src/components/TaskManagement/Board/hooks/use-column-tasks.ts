import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Except } from 'src/helpers/except'
import {
  Task as TaskModel,
  TASK_STATUS as ColumnType,
  TASK_STATUS,
} from 'src/services/task-management/task-management.service'

import { swap } from '../utils/helpers'
import { debug } from '../utils/logging'

import useTaskCollection from './use-task-collection'

const MAX_TASK_PER_COLUMN = 100

const useColumnTasks = (column: ColumnType) => {
  const [tasks, setTasks] = useTaskCollection()

  const columnTasks = tasks[column]

  const addEmptyTask = useCallback(() => {
    debug(`Adding new empty task to ${column} column`)
    setTasks((allTasks) => {
      const columnTasks = allTasks[column]

      if (columnTasks.length > MAX_TASK_PER_COLUMN) {
        debug('Too many task!')
        return allTasks
      }

      const newColumnTask: TaskModel = {
        id: uuidv4(),
        boardId: uuidv4(),
        status: TASK_STATUS[column],
        title: `New ${column} task`,
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
        dueDate: new Date(),
        priority: Math.floor(Math.random() * 4) + 1,
        owner: 'myID',
        attachments: [],
        supportTeamMembers: [],
        tags: ['PRODUTO'],
      }

      return {
        ...allTasks,
        [column]: [newColumnTask, ...columnTasks],
      }
    })
  }, [column, setTasks])

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

        debug(`Moving task ${movingTask.id} from ${from} to ${column}`)

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
    updateTask,
    dropTaskFrom,
    deleteTask,
    swapTasks,
  }
}

export default useColumnTasks
