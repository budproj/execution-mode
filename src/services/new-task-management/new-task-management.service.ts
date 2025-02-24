import { ParsedUrlQuery } from 'querystring'

import { AxiosInstance } from 'axios'

import { NewTask } from 'src/components/Task/types'
import { Except } from 'src/helpers/except'

export enum TASK_STATUS {
  PENDING = 'pending',
  TODO = 'toDo',
  DOING = 'doing',
  DONE = 'done',
}

export type Task = {
  _id: string
  team: string
  history: string[]
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
  deletedAt?: Date
  active?: boolean
  orderindex: number
  key_result?: string
  cycle: string | null
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

export type TaskInsert = Except<NewTask, 'id' | 'createdAt' | 'updatedAt' | 'history'>

export class NewTaskManagementService {
  constructor(private readonly client: AxiosInstance) {}

  async getAllTasks(teamId: string, parameters: ParsedUrlQuery) {
    if (!teamId) {
      throw new Error('A team_id is required to get tasks')
    }

    const { data: response } = await this.client.get<NewTask[]>(
      `task-management/${teamId}/task/list`,
      {
        params: parameters,
      },
    )

    return response
  }

  async addTask(data: TaskInsert) {
    const { data: response } = await this.client.post<NewTask>(
      `task-management/${data.team}/task/create`,
      data,
    )
    return response
  }

  async getTasksByKr(teamId: string, krId: string) {
    const { data: response } = await this.client.get<NewTask[]>(
      `task-management/${teamId}/task/list?kr=${krId}`,
    )
    return response
  }

  async removeTask(teamId: string, taskId: string) {
    // Soft delete
    await this.client.delete<NewTask>(`task-management/${teamId}/task/delete/${taskId}`)
  }

  async updateTask(data: Partial<NewTask>) {
    if (!data.id) {
      throw new Error('A id is required to update task')
    }

    const { data: response } = await this.client.put<NewTask>(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `task-management/${data.team}/task/update/${data.id}/`,
      data,
    )

    return response
  }
}
