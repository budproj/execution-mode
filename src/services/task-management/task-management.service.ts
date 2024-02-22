import { AxiosInstance } from 'axios'

import { Except } from 'src/helpers/except'

export enum TASK_STATUS {
  pending = 'pending',
  toDo = 'toDo',
  doing = 'doing',
  done = 'done',
}

enum BOARD_TYPE {
  TEAM_TASKS = 'TEAM_TASKS',
  PROJECT_TASKS = 'PROJECT_TASKS',
}

export type Task = {
  _id: string
  boardId: string
  status: TASK_STATUS
  title: string
  description: string
  dueDate: Date
  priority: number
  owner: string
  initialDate: Date
  attachments: string[]
  supportTeamMembers: string[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export type TaskUpdate = {
  _id: string
  taskId: string
  oldState: ITaskStateInterface
  patches: ITaskPatchInterface[]
  newState: ITaskStateInterface
  author: IAuthor
  createdAt: string
}

export interface ITaskPatchInterface {
  key: TaskPatchsKeys
  value: string
}

export interface ITaskStateInterface {
  title: string
  priority: number
  dueDate: Date
  owner: string
  description: string
  supportTeam: string[]
  author?: IAuthor
}

export interface IAuthor {
  type: IAuthorType
  identifier: string
}

export enum TaskPatchsKeys {
  createdTask = 'createdTask',
  title = 'title',
  priority = 'priority',
  dueDate = 'dueDate',
  owner = 'owner',
  description = 'description',
  addAttachment = 'addAttachment',
  deleteAttachment = 'deleteAttachment',
  supportTeam = 'supportTeam',
}

export enum IAuthorType {
  USER = 'USER',
  WORKER = 'WORKER',
  LLM = 'LLM',
}

export type TaskInsert = Except<Task, '_id' | 'createdAt' | 'updatedAt'>

export type Board = {
  _id: string
  title?: string
  type: BOARD_TYPE
  teamsIds?: string[]
  tasks: Task[]
  order: {
    pending: string[]
    toDo: string[]
    doing: string[]
    done: string[]
  }
  createdAt: Date
  updateadAt: Date
}

type GetTeamBoardInput = {
  teamId: string
}

export class TaskManagementService {
  constructor(private readonly client: AxiosInstance) {}

  async getTeamBoard({ teamId }: GetTeamBoardInput) {
    const { data } = await this.client.get<GetTeamBoardOutput>(`boards`, {
      params: {
        teamId,
      },
    })
    return data
  }

  async addTask(data: TaskInsert) {
    const { data: response } = await this.client.post<Task>(`tasks`, data)
    return response
  }

  async updateTask(data: Partial<Task>) {
    console.log({ data })

    if (!data._id) {
      throw new Error('A id is required to update task')
    }

    const { data: response } = await this.client.patch<Task>(`tasks/${data._id}`, data)

    console.log('ccccccccccccc')

    return response
  }

  async getTaskUpdates(data: string | undefined) {
    if (!data) {
      throw new Error('A id is required to get task updates')
    }

    const { data: response } = await this.client.get<TaskUpdate[]>(`task-updates/task/${data}`)

    return response
  }

  async removeTask(id: string) {
    await this.client.delete<Task>(`tasks/${id}`)
  }
}

type GetTeamBoardOutput = Board
