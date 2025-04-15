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

  async getAllTasks(parameters: ParsedUrlQuery) {
    /* 
      Accepted parameters 
      1. kr: Filter Key Result by id
      2. cycle: Filter cicle by id
      3. last: "last <0-100>" filter date by last x days
      4. since/upto: since + Date define start date, upto + Date define end
    */

    const { data: response } = await this.client.get<Task[]>(`task-management/task`, {
      params: parameters,
    })
    return response
  }

  async getTask(id: Task['id'], teamId?: string) {
    const parameters = {
      team_id__id: teamId,
    }
    const { data: response } = await this.client.get<Task>(`task-management/task/${id}`, {
      params: parameters,
    })

    return response
  }

  async addTask(data: TaskInsert) {
    const { data: response } = await this.client.post<NewTask>(`task-management/task`, data)

    return response
  }

  async removeTask(id: Task['id']) {
    // Tasks are soft deleted
    await this.client.delete<NewTask>(`task-management/task/${id}`)
  }

  async updateTask(id: Task['id'], data: Partial<TaskUpdate>) {
    if (!id) {
      throw new Error('A id is required to update task')
    }

    const { data: response } = await this.client.put<Task>(`task-management/task/${id}`, data)

    return response
  }
}
