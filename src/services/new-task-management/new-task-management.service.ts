import { ParsedUrlQuery } from 'querystring'

import { AxiosInstance } from 'axios'

import { NewTask } from 'src/components/Task/types'
import { User } from 'src/components/User/types'
import { Except } from 'src/helpers/except'

import { KeyResult } from '../okr/key-result/@types'

export enum TASK_STATUS {
  pending = 'pending',
  toDo = 'toDo',
  doing = 'doing',
  done = 'done',
}

export type Task = {
  id: string
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
  supportTeam?: User[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  active?: boolean
  orderindex: number
  keyResult?: KeyResult
  cycle?: string
  usersRelated: User[]
  ownerFullName: string
}

export type TaskUpdate = {
  id: string
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
  supportTeam?: string[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  active?: boolean
  orderindex: number
  keyResult?: KeyResult
  cycle?: string
  usersRelated: User[]
  ownerFullName: string
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

  async getAllTasks(data: string, parameters: ParsedUrlQuery) {
    if (!data) {
      throw new Error('A team_id is required to get tasks')
    }

    /* 
      Accepted parameters 
      1. kr: Filter Key Result by id
      2. cycle: Filter cicle by id
      3. last: "last <0-100>" filter date by last x days
      4. since/upto: since + Date define start date, upto + Date define end
    */

    const { data: response } = await this.client.get<Task[]>(`task-management/${data}/task/list`, {
      params: parameters,
    })
    return response
  }

  async getTask(id: Task['id'], teamId: string) {
    const { data: response } = await this.client.get<Task>(
      `task-management/${teamId}/task/get/${id}`,
    )

    return response
  }

  async addTask(team_id: string, data: TaskInsert) {
    const { data: response } = await this.client.post<NewTask>(
      `task-management/${team_id}/task/create`,
      data,
    )
    return response
  }

  async removeTask(team_id: string, task_id: string) {
    // Tasks are soft deleted
    await this.client.delete<NewTask>(`task-management/${team_id}/task/delete/${task_id}`)
  }

  async updateTask(teamId: string, taskId: string, data: Partial<TaskUpdate>) {
    if (!data.id) {
      throw new Error('A id is required to update task')
    }

    const { data: response } = await this.client.put<Task>(
      `task-management/${teamId}/task/update/${taskId}`,
      data,
    )

    return response
  }
}
